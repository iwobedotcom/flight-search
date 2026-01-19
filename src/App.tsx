import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Container } from "@mui/material";

const queryClient = new QueryClient();

import Home from "./pages/Home";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Home />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
