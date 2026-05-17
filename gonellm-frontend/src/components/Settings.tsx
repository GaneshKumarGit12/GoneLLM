import { useState } from "react";
import axios from "axios";
import { getSafeToken, removeSafeToken } from "../utils/tokenStore";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";

export default function Settings({ onDelete }: { onDelete: () => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handlePasswordUpdate = async () => {
    try {
      const token = getSafeToken();
      await axios.post(
        "/api/update-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("✅ Password updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      setSnackbarMessage("❌ Failed to update password.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = getSafeToken();
      await axios.delete("/api/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage("❌ Account deleted.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      removeSafeToken();
      onDelete();
    } catch (err) {
      console.error("Error deleting account:", err);
      setSnackbarMessage("❌ Failed to delete account.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Settings
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 24,
          backdropFilter: "blur(12px)",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(26, 28, 30, 0.6)"
              : "rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Change Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handlePasswordUpdate}
            sx={{
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)",
              },
            }}
          >
            Update Password
          </Button>
        </Box>

        <Box sx={{ pt: 3, borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#ef4444" }}>
            Danger Zone
          </Typography>
          <Button
            variant="outlined"
            onClick={handleDeleteAccount}
            sx={{
              borderColor: "#ef4444",
              color: "#ef4444",
              "&:hover": {
                borderColor: "#dc2626",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
              },
            }}
          >
            Delete Account
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackbarSeverity} sx={{ borderRadius: 2 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
