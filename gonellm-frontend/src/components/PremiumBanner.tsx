import { Paper, Typography, Button, Stack } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

export default function PremiumBanner() {
  const upiLink =
    "upi://pay?pa=9849066833@upi&pn=GoneLLM&am=499&cu=INR"; // replace with your UPI ID

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mb: 3,
        background: "linear-gradient(90deg, #ff9800 0%, #f44336 100%)",
        color: "white",
        borderRadius: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          🚀 Premium Plan – Unlock all features
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "#f44336",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#ffe0e0" },
          }}
          href={upiLink}
        >
          Upgrade
        </Button>
      </Stack>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Get unlimited chats, image generation, and priority support.
      </Typography>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Or scan QR to pay via UPI:
      </Typography>
      <QRCodeCanvas
        value={upiLink}
        size={150}
        bgColor="#ffffff"
        fgColor="#000000"
        style={{ marginTop: 8, borderRadius: 8 }}
      />
    </Paper>
  );
}
