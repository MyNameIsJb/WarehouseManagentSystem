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
    if (quantity > existingProduct.quantity)
      return res.status(400).json({ message: "Invalid Quantity" });

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

export const updateSaleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productId, quantity, decoded } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const query = { store: decoded.store, productId };
    const existingProduct = await StoreInventory.findOne(query);
    const existingSale = await Sale.findById(id);

    if (!existingProduct)
      return res.status(404).json({ message: "Product id doesn't exist" });
    if (quantity > existingProduct.quantity)
      return res.status(400).json({ message: "Invalid Quantity" });

    const totalPrice =
      parseFloat(existingProduct.wareHousePrice.replace(/[₱,]+/g, "")) *
      quantity;
    const formattedPrice = totalPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });

    if (existingSale!.quantity !== quantity) {
      const existingQuantity =
        existingProduct.quantity + existingSale!.quantity;
      const currentQuantity = existingQuantity - quantity;

      await Sale.findByIdAndUpdate(
        id,
        { quantity, totalPrice: formattedPrice },
        { new: true }
      );

      await StoreInventory.findByIdAndUpdate(
        existingProduct.id,
        { quantity: currentQuantity },
        { new: true }
      );
      return res.status(200).json({ message: "Updated sale successfully" });
    } else {
      await Sale.findByIdAndUpdate(
        id,
        { quantity, totalPrice: formattedPrice },
        { new: true }
      );
      return res.status(200).json({ message: "Updated sale successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteSaleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { decoded } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const existingSale = await Sale.findById(id);
    const query = { store: decoded.store, productId: existingSale!.productId };
    const existingProduct = await StoreInventory.findOne(query);

    await StoreInventory.findByIdAndUpdate(
      existingProduct?.id,
      {
        quantity: existingProduct!.quantity + existingSale!.quantity,
      },
      { new: true }
    );

    await Sale.findByIdAndDelete(id);
    return res.status(203).json({ message: "Deleted sale successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
