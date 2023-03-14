import { Router } from "express";
import {
  createOutgoingProductController,
  deleteOutgoingProductController,
  deliverOutgoingProductController,
  getAllOutgoingProductsController,
  getOutgoingProductByIdController,
  updateOutgoingProductController,
} from "../controllers/outgoingProductController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get(
  "/getAllOutgoingProducts",
  middleware,
  getAllOutgoingProductsController
);
router.post(
  "/createOutgoingProduct",
  middleware,
  createOutgoingProductController
);
router.get(
  "/getOutgoingProduct/:id",
  middleware,
  getOutgoingProductByIdController
);
router.put(
  "/updateOutgoingProduct/:id",
  middleware,
  updateOutgoingProductController
);
router.delete(
  "/deleteOutgoingProduct/:id",
  middleware,
  deleteOutgoingProductController
);
router.post(
  "/deliverOutgoingProduct/:id",
  middleware,
  deliverOutgoingProductController
);

export default router;
