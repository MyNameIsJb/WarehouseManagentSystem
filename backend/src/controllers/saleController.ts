import { Request, Response } from "express";
import mongoose from "mongoose";
import Sale from "../models/Sale";
import StoreInventory from "../models/StoreInventory";

export const getAllSalesController = async (req: Request, res: Response) => {
  const { decoded } = req.body;

  try {
    if (!decoded.store) {
      const ITEMS_PER_PAGE = 5;
      const page: any = req.query.page || 1;
      const query = {};
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const countPromise = Sale.estimatedDocumentCount(query);
      const itemPromise = Sale.find(query).limit(ITEMS_PER_PAGE).skip(skip);
      const [count, items] = await Promise.all([countPromise, itemPromise]);
      const pageCount = count / ITEMS_PER_PAGE;
      const result = pageCount - Math.floor(pageCount);

      return res.status(200).json({
        pagination: {
          count,
          pageCount: result > 0 ? Math.trunc(pageCount) + 1 : pageCount,
        },
        items,
      });
    } else {
      const ITEMS_PER_PAGE = 5;
      const page: any = req.query.page || 1;
      const query = { nameOfStore: decoded.store };
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const countPromise = Sale.estimatedDocumentCount(query);
      const itemPromise = Sale.find(query).limit(ITEMS_PER_PAGE).skip(skip);
      const [count, items] = await Promise.all([countPromise, itemPromise]);
      const pageCount = count / ITEMS_PER_PAGE;
      const result = pageCount - Math.floor(pageCount);

      return res.status(200).json({
        pagination: {
          count,
          pageCount: result > 0 ? Math.trunc(pageCount) + 1 : pageCount,
        },
        items,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createSaleController = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const { decoded } = req.body;
  try {
    const query = { store: decoded.store, productId };
    const existingProduct = await StoreInventory.findOne(query);
    if (!existingProduct)
      return res.status(404).json({ message: "Product id doesn't exist" });

    const totalPrice =
      parseFloat(existingProduct.wareHousePrice.replace(/[₱,]+/g, "")) *
      quantity;
    const formattedPrice = totalPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });

    await StoreInventory.findByIdAndUpdate(
      existingProduct.id,
      {
        quantity: existingProduct.quantity - quantity,
      },
      { new: true }
    );

    await Sale.create({
      dateOfTransaction: new Date(),
      productId,
      brandName: existingProduct.brandName,
      description: existingProduct.description,
      model: existingProduct.model,
      quantity: quantity,
      totalPrice: formattedPrice,
      nameOfStore: existingProduct.store,
    });
    return res.status(200).json({ message: "Added sale successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleProduct = await Sale.findById({ _id: id });

    return res.status(200).json(singleProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
