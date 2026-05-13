import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const getUserStatus = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.json({ premium: user?.premium || false });
};

export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email: req.user.email }, { $set: { password: hashedPassword } });
  res.json({ message: "Password updated successfully" });
};

export const deleteAccount = async (req, res) => {
  await User.deleteOne({ email: req.user.email });
  res.json({ message: "Account deleted successfully" });
};
