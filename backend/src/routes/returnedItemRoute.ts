import { Router } from "express";
import { getAllReturnedItemsController } from "../controllers/returnedItemController";
import middleware from "../middleware/middleware";

const router: Router = Router();

// With Token
router.get("/getAllReturnedItems", middleware, getAllReturnedItemsController);

export default router;
