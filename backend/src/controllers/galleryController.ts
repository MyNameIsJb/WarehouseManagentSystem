import { Request, Response } from "express";
import Gallery from "../models/Gallery";

export const getAllImagesController = async (req: Request, res: Response) => {
  try {
    const ITEMS_PER_PAGE = 10;
    const page: any = req.query.page || 1;
    const query = {};
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const countPromise = Gallery.estimatedDocumentCount(query);
    const itemsPromise = Gallery.find(query).limit(ITEMS_PER_PAGE).skip(skip);
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

export const uploadImageController = async (req: Request, res: Response) => {
  const { brandName, itemDescription, classification, price } = req.body;

  try {
    await Gallery.create({
      brandName,
      itemDescription,
      classification,
      price,
    });

    return res.status(200).json({ message: "Successfully uploaded an image" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
