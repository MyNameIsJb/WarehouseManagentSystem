import { Router } from "express";
import {
  getAllImagesController,
  getImageById,
  updateImageController,
  uploadImageController,
  deleteImageController,
} from "../controllers/galleryController";
import middleware from "../middleware/middleware";

const router: Router = Router();

router.get("/getAllImages", middleware, getAllImagesController);
router.post("/uploadImage", middleware, uploadImageController);
router.get("/getImage/:id", middleware, getImageById);
router.put("/updateImage/:id", middleware, updateImageController);
router.delete("/deleteImage/:id", middleware, deleteImageController);

export default router;
