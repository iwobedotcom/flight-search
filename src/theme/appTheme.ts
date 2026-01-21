import { createTheme } from "@mui/material/styles";
import { components } from "./components";
import { getPalette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";

export function createAppTheme(mode: "light" | "dark") {
  return createTheme({
    spacing: 8,
    typography,
    palette: getPalette(mode),
    shadows,
    shape: { borderRadius: 8 },
    components,
  });
}
