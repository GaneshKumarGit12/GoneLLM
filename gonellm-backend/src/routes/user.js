import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserStatus, updatePassword, deleteAccount } from "../controllers/userController.js";

const router = express.Router();

router.get("/api/user-status", authMiddleware, getUserStatus);
router.post("/update-password", authMiddleware, updatePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;
