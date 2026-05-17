import bcrypt from "bcryptjs";
import User from "../models/User.js";
import inMemoryUsers from "../utils/inMemoryStore.js";

export const getUserStatus = async (req, res) => {
  try {
    let user = null;
    try {
      user = await User.findOne({ email: req.user.email });
    } catch (dbError) {
      // MongoDB not available, check in-memory
      user = inMemoryUsers.get(req.user.email);
    }
    res.json({ 
      premium: user?.premium || false,
      tokens: user?.tokens || 3000,
      requiresPasswordChange: user?.requiresPasswordChange || false
    });
  } catch (err) {
    console.error("Get user status error:", err);
    res.json({ premium: false, tokens: 3000 });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    try {
      await User.updateOne({ email: req.user.email }, { $set: { password: hashedPassword } });
    } catch (dbError) {
      // MongoDB not available, update in-memory
      const user = inMemoryUsers.get(req.user.email);
      if (user) {
        user.password = hashedPassword;
        inMemoryUsers.set(req.user.email, user);
      }
    }
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Update password error:", err);
    res.status(500).json({ error: "Password update failed", details: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    try {
      await User.deleteOne({ email: req.user.email });
    } catch (dbError) {
      // MongoDB not available, delete from in-memory
      inMemoryUsers.delete(req.user.email);
    }
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ error: "Account deletion failed", details: err.message });
  }
};
