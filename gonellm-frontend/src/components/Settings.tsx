import { useState } from "react";
import axios from "axios";

export default function Settings({ onDelete }: { onDelete: () => void }) {
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/update-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Password updated successfully!");
      setNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      alert("❌ Failed to update password.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("❌ Account deleted.");
      localStorage.removeItem("token");
      onDelete();
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("❌ Failed to delete account.");
    }
  };

  return (
    <div style={{ margin: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>⚙️ Settings</h3>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordUpdate}>Update Password</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleDeleteAccount} style={{ color: "red" }}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
