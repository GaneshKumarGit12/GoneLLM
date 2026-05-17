import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Paper,
  Fade,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { SmartToy, Send, Star } from "@mui/icons-material";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(3000);
  const [showTokenPopup, setShowTokenPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user-status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTokens(res.data.tokens);
      } catch (err) {
        console.error("Failed to fetch tokens:", err);
      }
    };
    fetchTokens();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages([...messages, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/chat",
        { message: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.response },
      ]);
      setTokens(res.data.tokens);
    } catch (err: any) {
      console.error("Chat error:", err);
      if (err.response?.status === 403 && err.response?.data?.tokens === 0) {
        setShowTokenPopup(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "You have 0 tokens. Please purchase more tokens to continue chatting.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: 0,
        height: "100%",
        maxWidth: "100%",
        mx: "auto",
        width: "100%",
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 2,
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              boxShadow: "0 8px 32px 0 rgba(45, 90, 240, 0.3)",
            }}
          >
            <SmartToy sx={{ fontSize: 32 }} />
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 200 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              GoneLLM Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Powered by LLaMA AI
            </Typography>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 2,
              py: 1,
              borderRadius: 50,
              background: tokens > 0
                ? "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)"
                : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            <Star sx={{ fontSize: 16 }} /> {tokens} Tokens
          </Box>
        </Box>
      </Paper>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "transparent" : "transparent",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.length === 0 && (
          <Fade in={messages.length === 0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                py: { xs: 4, sm: 8 },
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mb: 3,
                  background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
                  boxShadow: "0 8px 32px 0 rgba(45, 90, 240, 0.3)",
                }}
              >
                <SmartToy sx={{ fontSize: 56 }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Welcome to GoneLLM
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
                Start a conversation with our AI assistant powered by LLaMA. Ask anything and get intelligent responses.
              </Typography>
            </Box>
          </Fade>
        )}

        {messages.map((m, i) => (
          <Slide
            key={i}
            direction={m.role === "user" ? "left" : "right"}
            in={true}
            timeout={300}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  maxWidth: { xs: "85%", sm: "75%", md: "70%" },
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: m.role === "user"
                      ? "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)"
                      : "linear-gradient(135deg, #7AC6CB 0%, #4CA1A6 100%)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {m.role === "user" ? (
                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>U</Typography>
                  ) : (
                    <SmartToy sx={{ fontSize: 20 }} />
                  )}
                </Avatar>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 24,
                    borderBottomRightRadius: m.role === "user" ? 4 : 24,
                    borderTopLeftRadius: m.role === "assistant" ? 4 : 24,
                    backdropFilter: "blur(12px)",
                    background: m.role === "user"
                      ? "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)"
                      : (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(26, 28, 30, 0.6)"
                            : "rgba(255, 255, 255, 0.4)",
                    border: m.role === "user"
                      ? "none"
                      : "1px solid rgba(255, 255, 255, 0.2)",
                    color: m.role === "user" ? "white" : "text.primary",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {m.content}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Slide>
        ))}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #7AC6CB 0%, #4CA1A6 100%)",
                }}
              >
                <SmartToy sx={{ fontSize: 20 }} />
              </Avatar>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 16,
                  backdropFilter: "blur(12px)",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(26, 28, 30, 0.6)"
                      : "rgba(255, 255, 255, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                }}
              >
                <CircularProgress size={20} />
              </Paper>
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mt: 2,
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
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-end" }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 50,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.6)",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            sx={{
              minWidth: 56,
              height: 56,
              borderRadius: 50,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)",
              },
              "&:disabled": {
                background: (theme) =>
                  theme.palette.mode === "dark" ? "#334155" : "#cbd5e1",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : <Send />}
          </Button>
        </Box>
      </Paper>

      {/* Token Purchase Popup */}
      <Dialog open={showTokenPopup} onClose={() => setShowTokenPopup(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
            <Star sx={{ color: "#fbbf24", fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Out of Tokens
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You have 0 tokens. Purchase 3000 tokens for just ₹199 to continue chatting with our AI assistant.
          </Typography>
          <Box
            sx={{
              p: 3,
              borderRadius: 16,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              color: "white",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              3000 Tokens
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              ₹199
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setShowTokenPopup(false)} sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)",
              },
            }}
            onClick={() => {
              // TODO: Implement Razorpay payment integration
              alert("Payment integration coming soon!");
              setShowTokenPopup(false);
            }}
          >
            Purchase Tokens
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
