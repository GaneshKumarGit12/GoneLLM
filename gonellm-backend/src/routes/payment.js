import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createOrder, paymentSuccess } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.post("/payment-success", paymentSuccess);

export default router;
