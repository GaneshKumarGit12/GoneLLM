import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Skip MongoDB connection if URI is placeholder
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes("<username>")) {
      console.log("⚠️ MongoDB not configured - running without database");
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("⚠️ Continuing without database connection");
  }
};

export default connectDB;
