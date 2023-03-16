import { Request, Response } from "express";
import OutgoingProduct from "../models/OutgoingProduct";
import Product from "../models/Product";
import mongoose from "mongoose";
import User from "../models/User";
import StoreIncomingProduct from "../models/StoreIncomingProduct";
import DailyAttendance from "../models/DailyAttendance";

export const getAllOutgoingProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const ITEMS_PER_PAGE = 5;
    const page: any = req.query.page || 1;
    const query = {};
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const countPromise = OutgoingProduct.estimatedDocumentCount(query);
    const itemsPromise = OutgoingProduct.find(query)
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

export const createOutgoingProductController = async (
  req: Request,
  res: Response
) => {
  const { productId, quantity, store } = req.body;

  try {
    const existingProduct = await Product.findOne({ productId });
    if (!existingProduct)
      return res.status(404).json({ message: "Product id doesn't exist" });
    if (quantity > existingProduct.quantity)
      return res.status(400).json({ message: "Invalid Quantity" });

    const existingStore = await User.findOne({ store });
    if (!existingStore || store === "N/A")
      return res.status(400).json({ message: "Store doesn't exist" });

    await OutgoingProduct.create({
      productId,
      brandName: existingProduct.brandName,
      description: existingProduct.description,
      model: existingProduct.model,
      quantity,
      pricePerUnit: existingProduct.pricePerUnit,
      dateOfTransaction: new Date(),
      store,
    });
    return res.status(200).json({ message: "Successfully added new product" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOutgoingProductByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleOutgoingProduct = await OutgoingProduct.findById({ _id: id });

    return res.status(200).json(singleOutgoingProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateOutgoingProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { productId, quantity, store } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const existingProduct = await Product.findOne({ productId });
    if (!existingProduct)
      return res.status(404).json({ message: "Product id doesn't exist" });
    if (quantity > existingProduct.quantity)
      return res.status(400).json({ message: "Invalid Quantity" });

    const existingStore = await User.findOne({ store });
    if (!existingStore || store === "N/A")
      return res.status(400).json({ message: "Store doesn't exist" });

    const existingId = await OutgoingProduct.findById({ _id: id });
    await OutgoingProduct.findByIdAndUpdate(
      existingId,
      {
        productId,
        brandName: existingProduct.brandName,
        description: existingProduct.description,
        model: existingProduct.model,
        quantity,
        pricePerUnit: existingProduct.pricePerUnit,
        store,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Successfully updated product" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteOutgoingProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    await OutgoingProduct.findByIdAndDelete(id);
    return res.status(203).json({ message: "Deleted product successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deliverOutgoingProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { decoded } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const existingOutgoingProduct = await OutgoingProduct.findById({ _id: id });
    const existingProduct = await Product.findOne({
      productId: existingOutgoingProduct?.productId,
    });
    const existingUser = await User.findOne({ _id: decoded.id });

    await StoreIncomingProduct.create({
      productId: existingOutgoingProduct!.productId,
      brandName: existingOutgoingProduct!.brandName,
      description: existingOutgoingProduct!.description,
      model: existingOutgoingProduct!.model,
      quantity: existingOutgoingProduct!.quantity,
      pricePerUnit: existingOutgoingProduct!.pricePerUnit,
      dateOfDelivery: new Date(),
      store: existingOutgoingProduct!.store,
    });
    await Product.findByIdAndUpdate(
      existingProduct!._id,
      {
        quantity: existingProduct!.quantity - existingOutgoingProduct!.quantity,
      },
      { new: true }
    );
    await DailyAttendance.create({
      name: existingUser?.name,
      activity: "Delivered product",
      productId: existingOutgoingProduct!.productId,
      brandName: existingOutgoingProduct!.brandName,
      description: existingOutgoingProduct!.description,
      model: existingOutgoingProduct!.model,
      quantity: existingOutgoingProduct!.quantity,
      dateOfActivity: new Date(),
    });
    await OutgoingProduct.findByIdAndDelete(id);
    return res.status(200).json({ message: "Successfully delivered product" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
