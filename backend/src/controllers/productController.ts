import { Request, Response } from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import Product from "../models/Product";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const ITEMS_PER_PAGE = 5;
    const page: any = req.query.page || 1;
    const query = {};
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const countPromise = Product.estimatedDocumentCount(query);
    const itemsPromise = Product.find(query).limit(ITEMS_PER_PAGE).skip(skip);
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

export const createProductController = async (req: Request, res: Response) => {
  const { brandName, description, model, quantity, pricePerUnit } = req.body;

  try {
    const existingModel = await Product.findOne({ model });
    if (existingModel)
      return res.status(400).json({ message: "Model already exist" });

    await Product.create({
      productId: crypto.randomBytes(8).toString("hex"),
      brandName,
      description,
      model,
      quantity,
      pricePerUnit: `₱${pricePerUnit}`,
    });
    return res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleProduct = await Product.findById({ _id: id });

    return res.status(200).json(singleProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { brandName, description, model, quantity, pricePerUnit } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const checkModelQuery = {
      _id: { $ne: id },
      model: model,
    };
    const existingModel = await Product.findOne(checkModelQuery);
    if (existingModel)
      return res.status(400).json({ message: "Model already exist" });

    const existingId = await Product.findById({ _id: id });
    await Product.findByIdAndUpdate(
      existingId,
      {
        brandName: brandName,
        description: description,
        model: model,
        quantity: quantity,
        pricePerUnit: pricePerUnit,
      },
      { new: true }
    );
    res.status(200).json({ message: "Successfully updated product" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    await Product.findByIdAndDelete(id);
    return res.status(203).json({ message: "Deleted product successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
