import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  getAllUser
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/verify-email", verifyEmail);
router.get("/getAllUsers", getAllUser);

export default router;
