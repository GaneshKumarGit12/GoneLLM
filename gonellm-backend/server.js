import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/user.js";
import paymentRoutes from "./src/routes/payment.js";
import chatRoutes from "./src/routes/chat.js";
import tokenRoutes from "./src/routes/token.js";

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
app.use("/api/tokens", tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
