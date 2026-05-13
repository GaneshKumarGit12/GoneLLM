import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./components/Chat";
import PremiumBanner from "./components/PremiumBanner";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import StarIcon from "@mui/icons-material/Star";
import NotificationsIcon from "@mui/icons-material/Notifications";

function App({ toggleTheme }: { toggleTheme: () => void }) {
  const [isPremium, setIsPremium] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeSection, setActiveSection] = useState("Profile");
  const [userEmail, setUserEmail] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user-status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsPremium(res.data.premium);
        setLoggedIn(true);

        // Decode JWT to get email
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserEmail(payload.email);

        // Example notifications
        setNotifications([
          "Welcome back!",
          res.data.premium ? "🌟 Premium unlocked!" : "🚀 Upgrade to Premium for more features",
        ]);

        // Show snackbar
        setSnackbarMessage("✅ Logged in successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (err) {
        console.error("Error fetching premium status:", err);
        setSnackbarMessage("❌ Failed to fetch status.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };
    fetchStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setIsPremium(false);
    setActiveSection("Profile");
    setNotifications(["You have logged out."]);

    setSnackbarMessage("✅ Logged out successfully!");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  };

  const handleDelete = () => {
    setLoggedIn(false);
    setIsPremium(false);
    setActiveSection("Profile");
    setNotifications(["Your account has been deleted."]);

    setSnackbarMessage("❌ Account deleted.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #1976d2 0%, #9c27b0 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🤖 GoneLLM
          </Typography>
          <Button color="inherit" onClick={toggleTheme}>
            Toggle Theme
          </Button>
          {loggedIn && (
            <>
              <IconButton color="inherit" onClick={handleNotificationsClick}>
                <NotificationsIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleNotificationsClose}
              >
                {notifications.length === 0 ? (
                  <MenuItem>No notifications</MenuItem>
                ) : (
                  notifications.map((note, index) => (
                    <MenuItem key={index}>{note}</MenuItem>
                  ))
                )}
              </Menu>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        {loggedIn && (
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              "& .MuiDrawer-paper": {
                width: 220,
                background: "linear-gradient(180deg, #1e1e2f, #2c2c3e)",
                color: "white",
              },
            }}
          >
            {/* User Avatar + Premium Badge */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                p: 2,
                borderBottom: "1px solid #444",
              }}
            >
              <Avatar sx={{ bgcolor: "#9c27b0", mb: 1 }}>
                {userEmail.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body1">{userEmail}</Typography>
              <Typography variant="body2" sx={{ color: "#ffeb3b", mt: 1 }}>
                {isPremium ? (
                  <>
                    <StarIcon sx={{ fontSize: 16, verticalAlign: "middle" }} /> Premium
                  </>
                ) : (
                  "Free User"
                )}
              </Typography>
            </Box>

            {/* Navigation */}
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  selected={activeSection === "Profile"}
                  onClick={() => setActiveSection("Profile")}
                >
                  <ListItemIcon>
                    <PersonIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  selected={activeSection === "Settings"}
                  onClick={() => setActiveSection("Settings")}
                >
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  selected={activeSection === "Chat"}
                  onClick={() => setActiveSection("Chat")}
                >
                  <ListItemIcon>
                    <ChatIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Chat" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        )}

        {/* Main Content */}
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          {!loggedIn ? (
            showRegister ? (
              <Register onRegister={() => setShowRegister(false)} />
            ) : (
              <>
                <Login onLogin={() => setLoggedIn(true)} />
                <p>
                  Don’t have an account?{" "}
                  <button onClick={() => setShowRegister(true)}>Register</button>
                </p>
              </>
            )
          ) : (
            <>
              {activeSection === "Profile" && <Profile />}
              {activeSection === "Settings" && <Settings onDelete={handleDelete} />}
              {activeSection === "Chat" &&
                (isPremium ? <Chat /> : <PremiumBanner />)}
            </>
          )}
        </Container>
      </div>

      {/* Snackbar for real-time feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
