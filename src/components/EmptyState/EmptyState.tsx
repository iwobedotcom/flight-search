import type { ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = ({
  icon,
  title = "No data found",
  message = "There is nothing to display at the moment.",
  action,
  secondaryAction,
}: EmptyStateProps) => {
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
      {icon || (
        <InboxIcon
          sx={{
            fontSize: 64,
            color: "text.disabled",
            mb: 2,
          }}
        />
      )}
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
        {action && (
          <Button variant="contained" onClick={action.onClick} size="large">
            {action.label}
          </Button>
        )}
        {secondaryAction && (
          <Button
            variant="outlined"
            onClick={secondaryAction.onClick}
            size="large"
          >
            {secondaryAction.label}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EmptyState;
