import { Router } from "express";
import {
  deleteOrderedProductController,
  getAllOrderedProductsController,
  getOrderedProductController,
  orderProductController,
  updateOrderedProductController,
} from "../controllers/orderProductController";
import middleware from "../middleware/middleware";

const router: Router = Router();

// With Token
router.get(
  "/getAllOrderedProducts",
  middleware,
  getAllOrderedProductsController
);
router.post("/orderProduct", middleware, orderProductController);
router.get("/getOrderedProduct/:id", middleware, getOrderedProductController);
router.put(
  "/updateOrderedProduct/:id",
  middleware,
  updateOrderedProductController
);
router.delete(
  "/deleteOrderedProduct/:id",
  middleware,
  deleteOrderedProductController
);

export default router;
