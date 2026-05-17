import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import ForceChangePassword from "./components/ForceChangePassword";
import Logo from "./components/Logo";
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
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Badge,
} from "@mui/material";
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Chat as ChatIcon,
  Star,
  Notifications,
  Logout,
  DarkMode,
  LightMode,
  Menu as MenuIcon,
} from "@mui/icons-material";

function App({ toggleTheme, isDarkMode }: { toggleTheme: () => void; isDarkMode: boolean }) {
  const [, setIsPremium] = useState(false);
  const [tokens, setTokens] = useState(3000);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeSection, setActiveSection] = useState("Profile");
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false);
  const [username, setUsername] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchStatus = async () => {
      try {
        const res = await axios.get("/api/user-status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsPremium(res.data.premium);
        setTokens(res.data.tokens);
        setLoggedIn(true);
        setRequiresPasswordChange(res.data.requiresPasswordChange);

        // Decode JWT to get username
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.username || payload.email); // Fallback to email if old token

        setNotifications([
          "Welcome back!",
          res.data.premium ? "🌟 Premium unlocked!" : "🚀 Upgrade to Premium for more features",
        ]);

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
    setRequiresPasswordChange(false);
    setActiveSection("Profile");
    setNotifications(["You have logged out."]);

    setSnackbarMessage("✅ Logged out successfully!");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  };

  const handleDelete = () => {
    setLoggedIn(false);
    setIsPremium(false);
    setRequiresPasswordChange(false);
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 280;

  const drawerContent = (
    <>
      {/* User Avatar + Premium Badge */}
      <Box
        sx={{
          p: 3,
          borderBottom: (theme) =>
            theme.palette.mode === "dark" ? "1px solid rgba(76, 181, 245, 0.1)" : "1px solid rgba(27, 147, 205, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
              boxShadow: "0 8px 24px rgba(27, 147, 205, 0.3)",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {username}
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.5,
                borderRadius: 50,
                background: tokens > 0
                  ? "linear-gradient(135deg, #7AC6CB 0%, #4CA1A6 100%)"
                  : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              <Star sx={{ fontSize: 14 }} /> {tokens} Tokens
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ p: 2 }}>
        {[
          { text: "Profile", icon: <PersonIcon />, id: "Profile" },
          { text: "Settings", icon: <SettingsIcon />, id: "Settings" },
          { text: "Chat", icon: <ChatIcon />, id: "Chat" },
        ].map((item) => (
          <ListItem disablePadding sx={{ mb: 1 }} key={item.id}>
            <ListItemButton
              selected={activeSection === item.id}
              onClick={() => { setActiveSection(item.id); setMobileOpen(false); }}
              sx={{
                borderRadius: 50,
                py: 1.5,
                px: 2.5,
                "&.Mui-selected": {
                  background: "linear-gradient(135deg, #1B93CD 0%, #4CB5F5 100%)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #11699B 0%, #1B93CD 100%)",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ fontWeight: 600, "& span": { fontWeight: 600 } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {loggedIn && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Logo size="medium" />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          {loggedIn && (
            <>
              <IconButton color="inherit" onClick={handleNotificationsClick}>
                <Badge badgeContent={notifications.length} sx={{ "& .MuiBadge-badge": { backgroundColor: "#7AC6CB", color: "#fff" } }}>
                  <Notifications />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleNotificationsClose}
                sx={{
                  "& .MuiPaper-root": { borderRadius: 4, mt: 1, minWidth: 200, boxShadow: "0 8px 32px rgba(27, 147, 205, 0.15)" }
                }}
              >
                {notifications.length === 0 ? (
                  <MenuItem>No notifications</MenuItem>
                ) : (
                  notifications.map((note, index) => (
                    <MenuItem key={index} sx={{ py: 1.5 }}>{note}</MenuItem>
                  ))
                )}
              </Menu>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<Logout />}
                sx={{ fontWeight: 600, display: { xs: "none", sm: "flex" } }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        {loggedIn && !requiresPasswordChange && (
          <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }} // Better open performance on mobile.
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "background.paper",
                  backgroundImage: "none",
                },
              }}
            >
              {drawerContent}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "background.paper",
                  backgroundImage: "none",
                  borderRight: "1px solid",
                  borderColor: "divider",
                },
              }}
              open
            >
              <Toolbar /> {/* Spacer for AppBar */}
              {drawerContent}
            </Drawer>
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: loggedIn && !requiresPasswordChange ? { xs: 2, md: 4 } : 0,
            width: { sm: `calc(100% - ${loggedIn && !requiresPasswordChange ? drawerWidth : 0}px)` },
            backgroundColor: "background.default",
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!loggedIn ? (
            showRegister ? (
              <Register onRegister={() => setShowRegister(false)} />
            ) : (
              <Login 
                onLogin={(reqChange) => {
                  setRequiresPasswordChange(reqChange);
                  setLoggedIn(true);
                }} 
                onSignupClick={() => setShowRegister(true)} 
              />
            )
          ) : requiresPasswordChange ? (
            <ForceChangePassword onSuccess={handleLogout} />
          ) : (
            <Box sx={{ maxWidth: 1000, mx: "auto", width: "100%" }}>
              {activeSection === "Profile" && <Profile />}
              {activeSection === "Settings" && <Settings onDelete={handleDelete} />}
              {activeSection === "Chat" && <Chat />}
            </Box>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%", borderRadius: 4, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
