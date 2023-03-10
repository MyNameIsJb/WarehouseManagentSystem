import { Router } from "express";
import {
  createBarcodeController,
  deleteAllBarcodesController,
  getAllBarcodesController,
} from "../controllers/barcodeGeneratorController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.post("/createBarcode", middleware, createBarcodeController);
router.get("/getAllBarcodes", middleware, getAllBarcodesController);
router.delete("/deleteAllBarcodes", middleware, deleteAllBarcodesController);

export default router;
