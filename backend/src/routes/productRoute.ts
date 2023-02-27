import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductById,
  updateProductController,
} from "../controllers/productController";
import middleware from "../middleware/middleware";

const router: Router = Router();

// With Token
router.get("/getAllProducts", middleware, getAllProductsController);
router.post("/createProduct", middleware, createProductController);
router.get("/getProduct/:id", middleware, getProductById);
router.put("/updateProduct/:id", middleware, updateProductController);
router.delete("/deleteProduct/:id", middleware, deleteProductController);

export default router;
