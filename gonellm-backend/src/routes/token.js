import express from "express";
import { createTokenOrder, verifyTokenPayment } from "../controllers/tokenController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order for token purchase
router.post("/create-order", authMiddleware, createTokenOrder);

// Verify payment and add tokens
router.post("/verify-payment", authMiddleware, verifyTokenPayment);

export default router;
