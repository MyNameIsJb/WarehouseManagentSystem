import { Router } from "express";
import {
  createReturnedItemController,
  deleteReturnedItemController,
  getAllReturnedItemsController,
  getReturnedItemController,
  updateReturnedItemController,
} from "../controllers/returnedItemController";
import middleware from "../middleware/middleware";

const router: Router = Router();

// With Token
router.get("/getAllReturnedItems", middleware, getAllReturnedItemsController);
router.post("/createReturnedItem", middleware, createReturnedItemController);
router.get("/getReturnedItem/:id", middleware, getReturnedItemController);
router.put("/updateReturnedItem/:id", middleware, updateReturnedItemController);
router.post(
  "/deleteReturnedItem/:id",
  middleware,
  deleteReturnedItemController
);

export default router;
