import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1B93CD", // Oceanic Blue
      light: "#4CB5F5",
      dark: "#11699B",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7AC6CB", // Soft Teal
      light: "#B2EBF2",
      dark: "#4CA1A6",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F4FAFD", // Very soft blue/white
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A2B4C", // Deep Blue-Gray for high readability
      secondary: "#5C7691",
    },
    divider: "rgba(27, 147, 205, 0.15)",
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    h1: { fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-0.02em", lineHeight: "2.75rem" },
    h2: { fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.01em", lineHeight: "2.25rem" },
    h3: { fontWeight: 700, fontSize: "1.25rem", lineHeight: "1.75rem" },
    h4: { fontWeight: 700, fontSize: "1.125rem", lineHeight: "1.5rem" },
    h5: { fontWeight: 600, fontSize: "1rem" },
    h6: { fontWeight: 600, fontSize: "0.875rem" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 700, fontSize: "1rem" },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 28px",
          borderRadius: 50,
          boxShadow: "0 6px 16px rgba(27, 147, 205, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(27, 147, 205, 0.3)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#F3F4F6",
            boxShadow: "none",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "rgba(27, 147, 205, 0.4)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1B93CD",
              borderWidth: 2,
            },
            "& input": {
              padding: "14px 16px",
            }
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(27, 147, 205, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid rgba(27, 147, 205, 0.1)",
          color: "#1A2B4C",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4CB5F5",
      light: "#81D4FA",
      dark: "#1B93CD",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7AC6CB",
      light: "#B2EBF2",
      dark: "#4CA1A6",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0B192C",
      paper: "#122A46",
    },
    text: {
      primary: "#F4FAFD",
      secondary: "#A8BBD0",
    },
    divider: "rgba(76, 181, 245, 0.15)",
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    h1: { fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-0.02em", lineHeight: "2.75rem" },
    h2: { fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.01em", lineHeight: "2.25rem" },
    h3: { fontWeight: 700, fontSize: "1.25rem", lineHeight: "1.75rem" },
    h4: { fontWeight: 700, fontSize: "1.125rem", lineHeight: "1.5rem" },
    h5: { fontWeight: 600, fontSize: "1rem" },
    h6: { fontWeight: 600, fontSize: "0.875rem" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 700, fontSize: "1rem" },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 28px",
          borderRadius: 50,
          boxShadow: "0 6px 16px rgba(76, 181, 245, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(76, 181, 245, 0.3)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#1E3A5F",
            boxShadow: "none",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "rgba(76, 181, 245, 0.4)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4CB5F5",
              borderWidth: 2,
            },
            "& input": {
              padding: "14px 16px",
            }
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#122A46",
          border: "1px solid rgba(76, 181, 245, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#122A46",
          borderBottom: "1px solid rgba(76, 181, 245, 0.1)",
          color: "#F4FAFD",
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
