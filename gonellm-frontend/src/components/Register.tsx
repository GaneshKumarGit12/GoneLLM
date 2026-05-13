import { useState } from "react";
import axios from "axios";

export default function Register({ onRegister }: { onRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        email,
        password,
      });
      alert("✅ Registered successfully! Now login.");
      onRegister();
    } catch (err) {
      console.error("Registration failed:", err);
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
