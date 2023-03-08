import { Router } from "express";
import { getAllOrderProductsController } from "../controllers/orderProductController";
import middleware from "../middleware/middleware";

const router: Router = Router();

// With Token
router.get("/getAllOrderProducts", middleware, getAllOrderProductsController);

export default router;
