import { Box, Typography } from "@mui/material";
import { SmartToy } from "@mui/icons-material";

export default function Logo({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { icon: 28, text: "h6" },
    medium: { icon: 36, text: "h5" },
    large: { icon: 52, text: "h4" },
  };

  const { icon, text } = sizes[size];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          position: "relative",
          width: icon + 12,
          height: icon + 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background gradient circle */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
            boxShadow: "0 8px 32px 0 rgba(45, 90, 240, 0.3)",
          }}
        />
        {/* Inner glassmorphic circle */}
        <Box
          sx={{
            position: "absolute",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        />
        {/* Icon */}
        <SmartToy
          sx={{
            position: "relative",
            fontSize: icon,
            color: "white",
            zIndex: 1,
          }}
        />
      </Box>
      <Typography
        variant={text as any}
        sx={{
          fontWeight: 700,
          background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: -0.02,
        }}
      >
        GoneLLM
      </Typography>
    </Box>
  );
}
