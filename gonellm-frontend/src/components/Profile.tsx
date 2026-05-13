import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user-status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPremium(res.data.premium);

        // Decode JWT to get email
        const payload = JSON.parse(atob(token.split(".")[1]));
        setEmail(payload.email);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={{ margin: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>👤 Profile</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Status:</strong> {premium ? "🌟 Premium User" : "🚀 Free User"}</p>
    </div>
  );
}
