import { Router } from "express";
import {
  createPasswordController,
  createUserController,
  deleteUserController,
  forgotPasswordController,
  getAllUsersController,
  getProfileController,
  getUserById,
  resetPasswordController,
  signInController,
  updateProfileController,
  updateUserController,
} from "../controllers/userController";
import middleware from "../middleware/middleware";

const router: Router = Router();

// Without token
router.post("/signIn", signInController);
router.post("/forgotPassword", forgotPasswordController);
router.post("/resetPassword", resetPasswordController);
router.post("/createPassword", createPasswordController);

// With token
router.get("/getProfile", middleware, getProfileController);
router.get("/getAllUsers", middleware, getAllUsersController);
router.post("/createUser", middleware, createUserController);
router.get("/getUser/:id", middleware, getUserById);
router.post("/updateUser/:id", middleware, updateUserController);
router.delete("/deleteUser/:id", middleware, deleteUserController);
router.put("/updateProfile", middleware, updateProfileController);

export default router;
