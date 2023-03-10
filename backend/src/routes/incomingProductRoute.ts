import { Router } from "express";
import {
  createIncomingProductController,
  deleteIncomingProductController,
  getAllIncomingProductsController,
  getIncomingProductByIdController,
  receivedIncomingProductController,
  updateIncomingProductController,
} from "../controllers/incomingProductController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get(
  "/getAllIncomingProducts",
  middleware,
  getAllIncomingProductsController
);
router.post(
  "/createIncomingProduct",
  middleware,
  createIncomingProductController
);
router.get(
  "/getIncomingProduct/:id",
  middleware,
  getIncomingProductByIdController
);
router.put(
  "/updateIncomingProduct/:id",
  middleware,
  updateIncomingProductController
);
router.delete(
  "/deleteIncomingProduct/:id",
  middleware,
  deleteIncomingProductController
);
router.post(
  "/receivedIncomingProduct/:id",
  middleware,
  receivedIncomingProductController
);

export default router;
