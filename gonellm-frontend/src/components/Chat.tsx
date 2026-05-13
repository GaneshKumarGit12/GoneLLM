import { useState } from "react";
import axios from "axios";
import { Stack, Typography, TextField, Button, Box, CircularProgress } from "@mui/material";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages([...messages, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/chat",
        { message: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.response },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "80vh",
        border: "1px solid #ccc",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Scrollable messages area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: "background.default",
        }}
      >
        {messages.length === 0 && (
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mt: 4 }}>
            Start a conversation with GoneLLM! 🤖
          </Typography>
        )}
        {messages.map((m, i) => (
          <Stack
            key={i}
            direction="row"
            spacing={2}
            sx={{
              p: 2,
              mb: 1,
              borderRadius: 3,
              boxShadow: 2,
              backgroundColor: m.role === "user" ? "#1976d2" : "background.paper",
              color: m.role === "user" ? "white" : "text.primary",
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "80%",
            }}
          >
            <Typography variant="body1">{m.content}</Typography>
          </Stack>
        ))}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      {/* Input bar */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          p: 2,
          borderTop: "1px solid #ddd",
          backgroundColor: "background.paper",
        }}
      >
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          sx={{ px: { xs: 2, sm: 4 }, width: { xs: "100%", sm: "auto" } }}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Stack>
    </Box>
  );
}
