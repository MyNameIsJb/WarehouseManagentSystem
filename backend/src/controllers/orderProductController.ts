import { Request, Response } from "express";
import mongoose from "mongoose";
import OrderProduct from "../models/OrderProduct";
import Product from "../models/Product";

export const getAllOrderedProductsController = async (
  req: Request,
  res: Response
) => {
  const { decoded } = req.body;

  try {
    if (!decoded.store) {
      const ITEMS_PER_PAGE = 5;
      const page: any = req.query.page || 1;
      const query = {};
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const countPromise = OrderProduct.estimatedDocumentCount(query);
      const itemsPromise = OrderProduct.find(query)
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
    } else {
      const ITEMS_PER_PAGE = 5;
      const page: any = req.query.page || 1;
      const query = { store: decoded.store };
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const countPromise = OrderProduct.estimatedDocumentCount(query);
      const itemsPromise = OrderProduct.find(query)
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
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const orderProductController = async (req: Request, res: Response) => {
  const { decoded, productId, quantity } = req.body;

  try {
    const existingProduct = await Product.findOne({ productId });
    if (!existingProduct)
      return res.status(404).json({ message: "Product id doesn't exist" });

    await OrderProduct.create({
      productId,
      brandName: existingProduct.brandName,
      description: existingProduct.description,
      model: existingProduct.model,
      quantity,
      store: decoded.store,
      orderedDate: new Date(),
    });
    return res.status(200).json({ message: "Order item successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrderedProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleOrder = await OrderProduct.findById({ _id: id });

    return res.status(200).json(singleOrder);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateOrderedProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const existingProduct = await Product.findOne({ productId });
    if (!existingProduct)
      return res.status(404).json({ message: "Product id doesn't exist" });

    await OrderProduct.findByIdAndUpdate(
      id,
      {
        quantity,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Updated product successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteOrderedProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    await OrderProduct.findByIdAndDelete(id);
    return res
      .status(203)
      .json({ message: "Deleted ordered product successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
