import { Router } from "express";
import {
  getAllStoreIncomingProductController,
  receivedIncomingProductController,
} from "../controllers/storeIncomingProductController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get(
  "/getAllStoreIncomingProduct",
  middleware,
  getAllStoreIncomingProductController
);
router.post(
  "/receivedStoreIncomingProduct/:id",
  middleware,
  receivedIncomingProductController
);

export default router;
