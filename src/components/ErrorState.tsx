import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const ErrorState = ({
  title = "Something went wrong",
  message = "We encountered an error while loading this content. Please try again.",
  onRetry,
  retryLabel = "Try Again",
  actionLabel,
  onAction,
}: ErrorStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 300,
        textAlign: "center",
        p: 3,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 64,
          color: "error.main",
          mb: 2,
          opacity: 0.8,
        }}
      />
      <Typography variant="h5" gutterBottom fontWeight={600}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 500 }}
      >
        {message}
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {onRetry && (
          <Button variant="contained" onClick={onRetry} size="large">
            {retryLabel}
          </Button>
        )}
        {onAction && actionLabel && (
          <Button variant="outlined" onClick={onAction} size="large">
            {actionLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ErrorState;
