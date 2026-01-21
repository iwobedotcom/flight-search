import { useState, useMemo, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import Header from "./components/Header";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient();

function App() {
  const [themeMode, setThemeMode] = useState<"system" | "light" | "dark">(
    () => {
      const savedMode = localStorage.getItem("themeMode");
      return (savedMode as "system" | "light" | "dark") || "system";
    },
  );

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const [systemMode, setSystemMode] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Determine the actual theme mode
  const actualMode = themeMode === "system" ? systemMode : themeMode;

  // Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        spacing: 8,
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          },
          h2: {
            fontSize: "2rem",
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          },
          h3: {
            fontSize: "1.75rem",
            fontWeight: 600,
            lineHeight: 1.4,
          },
          h4: {
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.4,
          },
          h5: {
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.5,
          },
          h6: {
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.5,
          },
          body1: {
            fontSize: "1rem",
            lineHeight: 1.6,
          },
          body2: {
            fontSize: "0.875rem",
            lineHeight: 1.6,
          },
          button: {
            textTransform: "none",
            fontWeight: 500,
          },
          caption: {
            fontSize: "0.75rem",
          },
          overline: {
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          },
        },
        palette: {
          mode: actualMode,
          primary: {
            main: "#564efd",
            light: "#b7b3ff",
            dark: "#271bfe",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#9c27b0",
            light: "#ba68c8",
            dark: "#7b1fa2",
            contrastText: "#ffffff",
          },
          error: {
            main: "#d32f2f",
            light: "#ef5350",
            dark: "#c62828",
          },
          warning: {
            main: "#ed6c02",
            light: "#ff9800",
            dark: "#e65100",
          },
          success: {
            main: "#2e7d32",
            light: "#4caf50",
            dark: "#1b5e20",
          },
          info: {
            main: "#0288d1",
            light: "#03a9f4",
            dark: "#01579b",
          },
          background: {
            default: actualMode === "dark" ? "#121212" : "#f1f0f5",
            paper: actualMode === "dark" ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: actualMode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 1)",
            secondary:
              actualMode === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(0, 0, 0, 0.6)",
            disabled:
              actualMode === "dark"
                ? "rgba(255, 255, 255, 0.5)"
                : "rgba(0, 0, 0, 0.3)",
          },
        },
        shadows: [
          "none",
          "0px 2px 4px rgba(0,0,0,0.05)",
          "0px 4px 8px rgba(0,0,0,0.08)",
          "0px 8px 16px rgba(0,0,0,0.1)",
          "0px 12px 24px rgba(0,0,0,0.12)",
          "0px 16px 32px rgba(0,0,0,0.14)",
          "0px 20px 40px rgba(0,0,0,0.16)",
          "0px 24px 48px rgba(0,0,0,0.18)",
          "0px 2px 4px rgba(0,0,0,0.05)",
          "0px 4px 8px rgba(0,0,0,0.08)",
          "0px 8px 16px rgba(0,0,0,0.1)",
          "0px 12px 24px rgba(0,0,0,0.12)",
          "0px 16px 32px rgba(0,0,0,0.14)",
          "0px 20px 40px rgba(0,0,0,0.16)",
          "0px 24px 48px rgba(0,0,0,0.18)",
          "0px 2px 4px rgba(0,0,0,0.05)",
          "0px 4px 8px rgba(0,0,0,0.08)",
          "0px 8px 16px rgba(0,0,0,0.1)",
          "0px 12px 24px rgba(0,0,0,0.12)",
          "0px 16px 32px rgba(0,0,0,0.14)",
          "0px 20px 40px rgba(0,0,0,0.16)",
          "0px 24px 48px rgba(0,0,0,0.18)",
          "0px 2px 4px rgba(0,0,0,0.05)",
          "0px 4px 8px rgba(0,0,0,0.08)",
          "0px 8px 16px rgba(0,0,0,0.1)",
        ],
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                padding: "8px 16px",
              },
              sizeLarge: {
                padding: "12px 24px",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [actualMode],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Header themeMode={themeMode} onThemeModeChange={setThemeMode} />
          <main style={{ backgroundImage: "url('/src/assets/bg.jpg')" }}>
            <Container maxWidth="lg" sx={{ py: 10 }}>
              <Home />
            </Container>
          </main>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
