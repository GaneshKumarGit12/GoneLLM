import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { Person, Star } from "@mui/icons-material";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [premium, setPremium] = useState(false);
  const [tokens, setTokens] = useState(3000);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/user-status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPremium(res.data.premium);
        setTokens(res.data.tokens || 3000);

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
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Profile
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4, flexWrap: "wrap" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              boxShadow: "0 8px 32px 0 rgba(45, 90, 240, 0.3)",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            {email.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {email}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Chip
                icon={<Star />}
                label={`${tokens} Tokens`}
                sx={{
                  background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
              <Chip
                label={premium ? "🌟 Premium User" : "🚀 Free User"}
                sx={{
                  background: premium
                    ? "linear-gradient(135deg, #7AC6CB 0%, #4CA1A6 100%)"
                    : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Card
            elevation={0}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
              borderRadius: 16,
              backdropFilter: "blur(12px)",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(45, 90, 240, 0.1)"
                  : "rgba(45, 90, 240, 0.05)",
              border: "1px solid rgba(45, 90, 240, 0.2)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Person sx={{ color: "#2D5AF0" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Account Type
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {premium ? "Premium" : "Free"}
              </Typography>
            </CardContent>
          </Card>
          <Card
            elevation={0}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
              borderRadius: 16,
              backdropFilter: "blur(12px)",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(142, 45, 226, 0.1)"
                  : "rgba(142, 45, 226, 0.05)",
              border: "1px solid rgba(142, 45, 226, 0.2)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Star sx={{ color: "#8E2DE2" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Token Balance
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {tokens} tokens
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Box>
  );
}
