import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

export default function Register({ onRegister, onLoginClick }: { onRegister: () => void; onLoginClick?: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.username || 
        !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/register", formData);
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onLoginClick) onLoginClick();
    else onRegister();
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onRegister();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", flexGrow: 1, height: "100%", minHeight: "100vh" }}>
      {/* Left Column: Welcome Banner */}
      <Box sx={{ 
        width: { xs: "100%", md: "50%" },
        display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", 
        background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)", 
        color: "white", p: 4
      }}>
        <Box sx={{ maxWidth: 400, textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, color: "white" }}>
            Hello, Friend!
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.9, fontWeight: 400, lineHeight: 1.6, color: "white" }}>
            Enter your personal details and start your journey with us. Let's create something amazing together.
          </Typography>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              py: 1.5,
              px: 4,
              borderRadius: 50,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              }
            }}
          >
            Already have an account? Signin.
          </Button>
        </Box>
      </Box>

      {/* Right Column: Form */}
      <Box sx={{ 
        width: { xs: "100%", md: "50%" },
        display: "flex", alignItems: "center", justifyContent: "center", 
        backgroundColor: "background.paper", p: 4
      }}>
        <Box sx={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
            Signup
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Box component="form" sx={{ mt: 1 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField margin="normal" required fullWidth id="firstName" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
              <TextField margin="normal" required fullWidth id="lastName" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            </Box>
            <TextField margin="normal" required fullWidth id="username" placeholder="Username" name="username" value={formData.username} onChange={handleChange} sx={{ mb: 1 }} />
            <TextField margin="normal" required fullWidth id="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} sx={{ mb: 1 }} />
            <TextField margin="normal" required fullWidth id="phone" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} sx={{ mb: 1 }} />
            <TextField margin="normal" required fullWidth name="password" placeholder="Password" type="password" id="password" value={formData.password} onChange={handleChange} sx={{ mb: 1 }} />
            <TextField margin="normal" required fullWidth name="confirmPassword" placeholder="Confirm Password" type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} sx={{ mb: 3 }} />
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleRegister}
              disabled={loading}
              sx={{
                mb: 2,
                py: 1.5,
                background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
                "&:hover": { background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)" },
                borderRadius: 2,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
            </Button>
            
            <Box sx={{ display: { xs: "block", md: "none" }, mt: 4 }}>
              <Button onClick={handleCancel} sx={{ textTransform: "none", fontWeight: 600 }}>
                Already have an account? Signin.
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onClose={handleSuccessModalClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
          <CheckCircle sx={{ fontSize: 64, color: "#1B93CD", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Registration Successful!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            No form validation issue and your Registration is Successful
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to GoneLLM! You will be redirected to the Dashboard.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleSuccessModalClose}
            sx={{
              px: 4,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              "&:hover": { background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)" },
            }}
          >
            Go to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
