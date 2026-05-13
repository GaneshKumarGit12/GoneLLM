import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import paymentRoutes from "./routes/payment.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());              // ✅ allow frontend requests
app.use(bodyParser.json());

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(paymentRoutes);
app.use(chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
