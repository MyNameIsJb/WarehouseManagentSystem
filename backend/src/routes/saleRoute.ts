import { Router } from "express";
import { getAllSalesController } from "../controllers/saleController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get("/getAllSales", middleware, getAllSalesController);

export default router;
