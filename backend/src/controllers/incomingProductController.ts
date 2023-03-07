import { Request, Response } from "express";
import crypto from "crypto";
import IncomingProduct from "../models/IncomingProduct";
import mongoose from "mongoose";

export const getAllIncomingProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const ITEMS_PER_PAGE = 5;
    const page: any = req.query.page || 1;
    const query = {};
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const countPromise = IncomingProduct.estimatedDocumentCount(query);
    const itemsPromise = IncomingProduct.find(query)
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

export const createIncomingProductController = async (
  req: Request,
  res: Response
) => {
  const { brandName, description, model, quantity, totalPrice } = req.body;
  try {
    await IncomingProduct.create({
      trackingId: crypto.randomBytes(8).toString("hex"),
      brandName,
      description,
      model,
      quantity,
      totalPrice: `₱${totalPrice}`,
      dateOfTransaction: new Date(),
    });
    return res.status(200).json({ message: "Successfully added new product" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getIncomingProductByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleIncomingProduct = await IncomingProduct.findById({ _id: id });

    return res.status(200).json(singleIncomingProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateIncomingProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { brandName, description, model, quantity, totalPrice } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const existingId = await IncomingProduct.findById({ _id: id });
    await IncomingProduct.findByIdAndUpdate(
      existingId,
      {
        brandName,
        description,
        model,
        quantity,
        totalPrice: totalPrice,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Successfully updated product" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteIncomingProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    await IncomingProduct.findByIdAndDelete(id);
    return res.status(203).json({ message: "Deleted product successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
