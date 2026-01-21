export function getPalette(mode: "light" | "dark") {
  return {
    mode,
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
      default: mode === "dark" ? "#121212" : "#f1f0f5",
      paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
    },
    text: {
      primary: mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 1)",
      secondary:
        mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
      disabled:
        mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.3)",
    },
  };
}
