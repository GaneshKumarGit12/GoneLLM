import Razorpay from "razorpay";
import User from "../models/User.js";
import inMemoryUsers from "../utils/inMemoryStore.js";
import crypto from "crypto";

// Initialize Razorpay
let razorpay = null;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (err) {
  console.log("Razorpay not initialized:", err.message);
}

export const createTokenOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ error: "Payment system not configured" });
    }

    const options = {
      amount: 19900, // Rs 199 in paise
      currency: "INR",
      receipt: `token_purchase_${Date.now()}`,
      notes: {
        email: req.user.email,
        tokens: 3000,
      },
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    res.status(500).json({ error: "Failed to create payment order", details: err.message });
  }
};

export const verifyTokenPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay) {
      return res.status(500).json({ error: "Payment system not configured" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (razorpay_signature !== expectedSignature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Add 3000 tokens to user
    const userEmail = req.user.email;
    try {
      await User.updateOne(
        { email: userEmail },
        { $inc: { tokens: 3000 } }
      );
    } catch (dbError) {
      const memUser = inMemoryUsers.get(userEmail);
      if (memUser) {
        memUser.tokens += 3000;
        inMemoryUsers.set(userEmail, memUser);
      }
    }

    res.json({ 
      success: true, 
      message: "Payment successful! 3000 tokens added to your account.",
      tokens: 3000
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ error: "Payment verification failed", details: err.message });
  }
};
