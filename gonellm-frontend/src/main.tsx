import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" }, secondary: { main: "#9c27b0" } },
});

const darkTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#90caf9" }, secondary: { main: "#ce93d8" } },
});

function Root() {
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <App toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
