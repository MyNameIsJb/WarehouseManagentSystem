import { Router } from "express";
import {
  createSaleController,
  getAllSalesController,
} from "../controllers/saleController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get("/getAllSales", middleware, getAllSalesController);
router.post("/createSale", middleware, createSaleController);

export default router;
