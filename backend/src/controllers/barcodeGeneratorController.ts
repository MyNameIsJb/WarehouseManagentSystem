import { Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";
import BarcodeGenerator from "../models/BarcodeGenerator";

export const createBarcodeController = async (req: Request, res: Response) => {
  const { decoded, productId } = req.body;

  try {
    const existingProductId = await Product.findOne({ productId });
    if (!existingProductId)
      return res.status(404).json({ message: "Product Id doesn't exist" });

    const existingUser = await User.findOne({ _id: decoded.id });
    await BarcodeGenerator.create({
      userId: existingUser?._id,
      productId,
    });
    return res.status(200).json({ message: "Barcode generated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllBarcodesController = async (req: Request, res: Response) => {
  const { decoded } = req.body;
  try {
    const items = await BarcodeGenerator.find({ userId: decoded.id });

    return res.status(200).json({
      items,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteAllBarcodesController = async (
  req: Request,
  res: Response
) => {
  const { decoded } = req.body;
  try {
    await BarcodeGenerator.deleteMany({ userId: decoded.id });

    return res
      .status(203)
      .json({ message: "Deleted all generated barcode successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
