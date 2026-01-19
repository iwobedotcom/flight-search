import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Container, Typography, Card, CardContent, Stack } from "@mui/material";

import LoadingSkeleton from "./components/LoadingSkeleton";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
          Component Showcase
        </Typography>

        <Stack spacing={4}>
          {/* Loading Skeleton Demo */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Loading Skeleton - Card Variant
              </Typography>
              <LoadingSkeleton variant="card" count={2} />
            </CardContent>
          </Card>

          {/* Error State Demo */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Error State
              </Typography>
              <ErrorState
                title="Failed to load data"
                message="We couldn't retrieve the information. Please check your connection."
                onRetry={() => console.log("Retry clicked")}
              />
            </CardContent>
          </Card>

          {/* Empty State Demo */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Empty State
              </Typography>
              <EmptyState
                title="No items yet"
                message="Start by creating your first item to see it appear here."
                action={{
                  label: "Create Item",
                  onClick: () => console.log("Create clicked"),
                }}
              />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
