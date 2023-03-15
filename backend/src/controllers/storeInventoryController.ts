import { Request, Response } from "express";
import mongoose from "mongoose";
import StoreInventory from "../models/StoreInventory";
import User from "../models/User";

export const getAllStoreInventoryController = async (
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
    const countPromise = StoreInventory.estimatedDocumentCount(query);
    const itemsPromise = StoreInventory.find(query)
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

export const getStoreProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleProduct = await StoreInventory.findById({ _id: id });

    return res.status(200).json(singleProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateStorePriceController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { storePrice } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    await StoreInventory.findByIdAndUpdate(
      id,
      {
        storePrice: `₱${storePrice}`,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Successfully updated price" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
