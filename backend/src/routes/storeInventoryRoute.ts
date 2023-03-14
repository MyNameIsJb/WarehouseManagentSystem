import { Router } from "express";
import { getAllStoreInventoryController } from "../controllers/storeInventoryController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get("/getAllStoreInventory", middleware, getAllStoreInventoryController);

export default router;
