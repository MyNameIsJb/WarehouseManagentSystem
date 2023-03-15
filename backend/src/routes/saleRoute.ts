import { Router } from "express";
import {
  createSaleController,
  deleteSaleController,
  updateSaleController,
  getAllSalesController,
  getSaleById,
} from "../controllers/saleController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get("/getAllSales", middleware, getAllSalesController);
router.post("/createSale", middleware, createSaleController);
router.get("/getSale/:id", middleware, getSaleById);
router.put("/updateSale/:id", middleware, updateSaleController);
router.post("/deleteSale/:id", middleware, deleteSaleController);

export default router;
