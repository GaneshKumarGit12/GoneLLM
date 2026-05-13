import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 49900,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Order creation failed", details: err.message });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    if (req.body.status === "captured") {
      await User.updateOne({ email: req.body.email }, { $set: { premium: true } });
      console.log("✅ Premium unlocked for:", req.body.email);
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Webhook failed", details: err.message });
  }
};
