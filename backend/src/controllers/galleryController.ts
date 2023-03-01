import { Request, Response } from "express";
import mongoose from "mongoose";
import Gallery from "../models/Gallery";

export const getAllImagesController = async (req: Request, res: Response) => {
  try {
    const ITEMS_PER_PAGE = 8;
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
  const { brandName, itemDescription, classification, price, image } = req.body;

  try {
    const type = image.substring(
      "data:image/".length,
      image.indexOf(";base64")
    );
    const imageType = ["jpeg", "jpg", "png", "gif", "webp"];
    if (imageType.indexOf(type) === -1)
      return res.status(400).json({ message: "Invalid file type" });

    const buffer = Buffer.from(image.substring(image.indexOf(",") + 1));
    if (buffer.length >= 52428800)
      return res.status(400).json({ message: "Image too large" });

    await Gallery.create({
      brandName,
      itemDescription,
      classification,
      price,
      image,
    });
    return res.status(200).json({ message: "Successfully uploaded an image" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getImageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleImage = await Gallery.findById({ _id: id });

    return res.status(200).json(singleImage);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
