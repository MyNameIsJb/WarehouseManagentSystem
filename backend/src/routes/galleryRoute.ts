import { Router } from "express";
import {
  getAllImagesController,
  uploadImageController,
} from "../controllers/galleryController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get("/getAllImages", middleware, getAllImagesController);
router.post("/uploadImage", middleware, uploadImageController);

export default router;
