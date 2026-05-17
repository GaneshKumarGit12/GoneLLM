import express from "express";
import { register, login, forgotPassword, forceChangePassword } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/force-change-password", authMiddleware, forceChangePassword);

export default router;
