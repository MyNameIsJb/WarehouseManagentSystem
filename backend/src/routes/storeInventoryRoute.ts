import { Router } from "express";
import {
  getAllStoreInventoryController,
  getStoreProductById,
  updateStorePriceController,
} from "../controllers/storeInventoryController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get("/getAllStoreInventory", middleware, getAllStoreInventoryController);
router.get("/getStoreProduct/:id", middleware, getStoreProductById);
router.put("/updateStorePrice/:id", middleware, updateStorePriceController);

export default router;
