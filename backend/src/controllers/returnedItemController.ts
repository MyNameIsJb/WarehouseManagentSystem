import { Request, Response } from "express";
import mongoose from "mongoose";
import ReturnedItem from "../models/ReturnedItem";
import StoreInventory from "../models/StoreInventory";

export const getAllReturnedItemsController = async (
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
      const countPromise = ReturnedItem.estimatedDocumentCount(query);
      const itemsPromise = ReturnedItem.find(query)
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
      const countPromise = ReturnedItem.estimatedDocumentCount(query);
      const itemsPromise = ReturnedItem.find(query)
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

export const createReturnedItemController = async (
  req: Request,
  res: Response
) => {
  const { decoded, productId, quantity, reason } = req.body;

  try {
    const existingProduct = await StoreInventory.findOne({ productId });
    if (!existingProduct)
      return res.status(404).json({ message: "Product id doesn't exist" });
    if (quantity > existingProduct.quantity)
      return res.status(400).json({ message: "Invalid Quantity" });

    await StoreInventory.findByIdAndUpdate(
      existingProduct.id,
      { quantity: existingProduct.quantity - quantity },
      { new: true }
    );

    await ReturnedItem.create({
      productId,
      brandName: existingProduct.brandName,
      description: existingProduct.description,
      model: existingProduct.model,
      quantity,
      reason,
      store: decoded.store,
      returnedDate: new Date(),
    });
    return res.status(200).json({ message: "Successfully added new record" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getReturnedItemController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleProduct = await ReturnedItem.findById({ _id: id });

    return res.status(200).json(singleProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateReturnedItemController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { decoded, productId, quantity, reason } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const query = { store: decoded.store, productId };
    const existingProduct = await StoreInventory.findOne(query);
    const existingReturnedItem = await ReturnedItem.findById(id);

    if (!existingProduct)
      return res.status(404).json({ message: "Product id doesn't exist" });
    if (quantity > existingProduct.quantity)
      return res.status(400).json({ message: "Invalid Quantity" });

    if (existingReturnedItem!.quantity !== quantity) {
      const existingQuantity =
        existingProduct.quantity + existingReturnedItem!.quantity;
      const currentQuantity = existingQuantity - quantity;

      await ReturnedItem.findByIdAndUpdate(
        id,
        { quantity, reason },
        { new: true }
      );

      await StoreInventory.findByIdAndUpdate(
        existingProduct.id,
        { quantity: currentQuantity },
        { new: true }
      );
      return res.status(200).json({ message: "Updated sale successfully" });
    } else {
      await ReturnedItem.findByIdAndUpdate(
        id,
        { quantity, reason },
        { new: true }
      );
      return res.status(200).json({ message: "Updated sale successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteReturnedItemController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { decoded } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const existingReturnedItem = await ReturnedItem.findById(id);
    const query = {
      store: decoded.store,
      productId: existingReturnedItem!.productId,
    };
    const existingProduct = await StoreInventory.findOne(query);

    await StoreInventory.findByIdAndUpdate(
      existingProduct?.id,
      {
        quantity: existingProduct!.quantity + existingReturnedItem!.quantity,
      },
      { new: true }
    );

    await ReturnedItem.findByIdAndDelete(id);
    return res.status(203).json({ message: "Deleted sale successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
