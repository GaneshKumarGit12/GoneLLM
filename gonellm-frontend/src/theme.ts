import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },   // Blue
    secondary: { main: "#9c27b0" }, // Purple
    background: { default: "#f4f6f8", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h4: { fontWeight: 700 },
    body1: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 12 },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },   // Light blue
    secondary: { main: "#ce93d8" }, // Light purple
    background: { default: "#121212", paper: "#1e1e1e" },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h4: { fontWeight: 700 },
    body1: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 12 },
});

export { lightTheme, darkTheme };
