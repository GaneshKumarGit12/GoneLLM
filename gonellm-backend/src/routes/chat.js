import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { chatWithLLaMA } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", authMiddleware, chatWithLLaMA);

export default router;
