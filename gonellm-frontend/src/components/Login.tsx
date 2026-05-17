import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";

export default function Login({ onLogin, onSignupClick }: { onLogin: () => void; onSignupClick: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", flexGrow: 1, height: "100%", minHeight: "100vh" }}>
      {/* Left Column: Form */}
      <Box sx={{ 
        width: { xs: "100%", md: "50%" },
        display: "flex", alignItems: "center", justifyContent: "center", 
        backgroundColor: "background.paper", p: 4
      }}>
        <Box sx={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4 }}>
            Signin
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
              sx={{
                mb: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
                "&:hover": { background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)" },
                borderRadius: 2,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Signin"}
            </Button>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              or signin with
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
               <IconButton sx={{ backgroundColor: "#3b5998", color: "white", "&:hover": { backgroundColor: "#2d4373" } }}><Facebook /></IconButton>
               <IconButton sx={{ backgroundColor: "#db4437", color: "white", "&:hover": { backgroundColor: "#c23321" } }}><Google /></IconButton>
               <IconButton sx={{ backgroundColor: "#007bb6", color: "white", "&:hover": { backgroundColor: "#005983" } }}><LinkedIn /></IconButton>
            </Box>

            {/* Mobile-only signup link */}
            <Box sx={{ display: { xs: "block", md: "none" }, mt: 4 }}>
              <Button onClick={onSignupClick} sx={{ textTransform: "none", fontWeight: 600 }}>
                No account yet? Signup.
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      
      {/* Right Column: Welcome Banner */}
      <Box sx={{ 
        width: { xs: "100%", md: "50%" },
        display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", 
        background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)", 
        color: "white", p: 4
      }}>
        <Box sx={{ maxWidth: 400, textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, color: "white" }}>
            Welcome back!
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.9, fontWeight: 400, lineHeight: 1.6, color: "white" }}>
            Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
          </Typography>
          <Button
            variant="outlined"
            onClick={onSignupClick}
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
            No account yet? Signup.
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
