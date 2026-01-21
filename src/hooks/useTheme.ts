import { useState, useEffect } from "react";
import { useSystemTheme } from "./useSystemTheme";

type ThemeMode = "system" | "light" | "dark";

export function useTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as ThemeMode) || "system";
  });

  const systemMode = useSystemTheme();

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const actualMode = themeMode === "system" ? systemMode : themeMode;

  return { themeMode, setThemeMode, actualMode };
}
