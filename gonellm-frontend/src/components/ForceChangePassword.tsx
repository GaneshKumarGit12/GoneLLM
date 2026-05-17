import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function ForceChangePassword({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/force-change-password",
        { newPassword: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
    } catch (err: any) {
      console.error("Change password failed:", err);
      setError(err.response?.data?.error || "Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", p: 4 }}>
        <Box sx={{ maxWidth: 400, width: "100%", textAlign: "center", backgroundColor: "background.paper", p: 5, borderRadius: 4, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            Success!
          </Typography>
          <Alert severity="success" sx={{ mb: 4 }}>
            change password is successfully update
          </Alert>
          <Button
            fullWidth
            variant="contained"
            onClick={onSuccess}
            sx={{
              py: 1.5,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              "&:hover": { background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)" },
              borderRadius: 2,
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", p: 4 }}>
      <Box sx={{ maxWidth: 400, width: "100%", textAlign: "center", backgroundColor: "background.paper", p: 5, borderRadius: 4, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Security Alert
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          You are using a temporary password. Please choose a new permanent password to continue.
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 4 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              py: 1.5,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              "&:hover": { background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)" },
              borderRadius: 2,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Update Password"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
