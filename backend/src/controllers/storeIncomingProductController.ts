import { Request, Response } from "express";
import mongoose from "mongoose";
import StoreIncomingProduct from "../models/StoreIncomingProduct";
import User from "../models/User";
import StoreInventory from "../models/StoreInventory";

export const getAllStoreIncomingProductController = async (
  req: Request,
  res: Response
) => {
  const { decoded } = req.body;

  try {
    const existingUserStore = await User.findOne({ _id: decoded.id });
    const ITEMS_PER_PAGE = 5;
    const page: any = req.query.page || 1;
    const query = { store: existingUserStore!.store };
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const countPromise = StoreIncomingProduct.estimatedDocumentCount(query);
    const itemsPromise = StoreIncomingProduct.find(query)
      .limit(ITEMS_PER_PAGE)
      .skip(skip);
    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = count / ITEMS_PER_PAGE;
    const result = pageCount - Math.floor(pageCount);

    return res.status(200).json({
      pagination: {
        count,
        pageCount: result > 0 ? Math.trunc(pageCount) + 1 : pageCount,
      },
      items,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const receivedIncomingProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const existingIncomingProduct = await StoreIncomingProduct.findById({
      _id: id,
    });
    const existingProduct = await StoreInventory.findOne({
      productId: existingIncomingProduct?.productId,
    });

    if (!existingProduct) {
      await StoreInventory.create({
        productId: existingIncomingProduct!.productId,
        brandName: existingIncomingProduct!.brandName,
        description: existingIncomingProduct!.description,
        model: existingIncomingProduct!.model,
        quantity: existingIncomingProduct!.quantity,
        wareHousePrice: existingIncomingProduct!.pricePerUnit,
        store: existingIncomingProduct!.store,
      });
      await StoreIncomingProduct.findByIdAndDelete(id);
      return res.status(200).json({ message: "Successfully received product" });
    } else {
      await StoreInventory.findByIdAndUpdate(
        existingProduct!._id,
        {
          quantity:
            existingProduct!.quantity + existingIncomingProduct!.quantity,
        },
        { new: true }
      );
      await StoreIncomingProduct.findByIdAndDelete(id);
      return res.status(200).json({ message: "Successfully received product" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
