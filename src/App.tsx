import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Home from "./pages/Home";
import Header from "./components/Header";

import { useTheme } from "./hooks/useTheme";
import { createAppTheme } from "./theme/appTheme";

import bgImage from "./assets/bg.jpg";

const queryClient = new QueryClient();

function App() {
  const { themeMode, setThemeMode, actualMode } = useTheme();
  const theme = createAppTheme(actualMode);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Header themeMode={themeMode} onThemeModeChange={setThemeMode} />
          <main style={{ backgroundImage: `url(${bgImage})` }}>
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
