import { Request, Response } from "express";
import Purchase from "../models/Purchase";

export const getAllPurchasesController = async (
  req: Request,
  res: Response
) => {
  try {
    const ITEMS_PER_PAGE = 5;
    const page: any = req.query.page || 1;
    const query = {};
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const countPromise = Purchase.estimatedDocumentCount(query);
    const itemPromise = Purchase.find(query).limit(ITEMS_PER_PAGE).skip(skip);
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
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
