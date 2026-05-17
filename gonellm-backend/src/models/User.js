import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  premium: { type: Boolean, default: false },
  tokens: { type: Number, default: 3000 },
  requiresPasswordChange: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);
