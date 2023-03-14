import { Request, Response } from "express";
import IncomingProduct from "../models/IncomingProduct";
import mongoose from "mongoose";
import Product from "../models/Product";
import Purchase from "../models/Purchase";
import User from "../models/User";
import DailyAttendance from "../models/DailyAttendance";

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

export const receivedIncomingProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { decoded } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const existingIncomingProduct = await IncomingProduct.findById({ _id: id });
    const existingProduct = await Product.findOne({
      model: existingIncomingProduct?.model,
    });
    const existingUser = await User.findOne({ _id: decoded.id });

    if (!existingProduct) {
      await Purchase.create({
        dateOfTransaction: new Date(),
        brandName: existingIncomingProduct!.brandName,
        description: existingIncomingProduct!.description,
        model: existingIncomingProduct!.model,
        quantity: existingIncomingProduct!.quantity,
        totalPrice: existingIncomingProduct!.totalPrice,
      });
      await DailyAttendance.create({
        name: existingUser!.name,
        activity: "Received product",
        brandName: existingIncomingProduct!.brandName,
        description: existingIncomingProduct!.description,
        model: existingIncomingProduct!.model,
        quantity: existingIncomingProduct!.quantity,
        dateOfActivity: new Date(),
      });
      await IncomingProduct.findByIdAndDelete(id);
      return res.status(200).json({ message: "Successfully received product" });
    } else {
      await Product.findByIdAndUpdate(
        existingProduct!._id,
        {
          quantity:
            existingProduct!.quantity + existingIncomingProduct!.quantity,
        },
        { new: true }
      );
      await Purchase.create({
        dateOfTransaction: new Date(),
        brandName: existingIncomingProduct!.brandName,
        description: existingIncomingProduct!.description,
        model: existingIncomingProduct!.model,
        quantity: existingIncomingProduct!.quantity,
        totalPrice: existingIncomingProduct!.totalPrice,
      });
      await DailyAttendance.create({
        name: existingUser?.name,
        activity: "Received product",
        productId: existingProduct.productId,
        brandName: existingIncomingProduct!.brandName,
        description: existingIncomingProduct!.description,
        model: existingIncomingProduct!.model,
        quantity: existingIncomingProduct!.quantity,
        dateOfActivity: new Date(),
      });
      await IncomingProduct.findByIdAndDelete(id);
      return res.status(200).json({ message: "Successfully received product" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
