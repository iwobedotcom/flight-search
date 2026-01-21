import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { FlightRow } from "../types/flight";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FlightTakeoff } from "@mui/icons-material";

interface Props {
  flights: FlightRow[];
}

export function FlightsChips() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const flightInfo = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        fontSize="small"
        fontWeight={550}
        sx={{ display: "flex", alignItems: "center" }}
      >
        LA
        <FlightTakeoff sx={{ mx: 0.5 }} fontSize="small" />
        CA
      </Typography>

      <Typography
        variant="body2"
        color="primary"
        fontSize="small"
        fontWeight={500}
      >
        $432.50
      </Typography>
    </Box>
  );

  return (
    <Stack
      direction="row"
      spacing={1} // horizontal spacing
      flexWrap="wrap"
      rowGap={1}
    >
      {Array.from({ length: 3 }).map((_, idx) => (
        <Chip
          key={idx}
          label={flightInfo}
          onClick={handleClick}
          onDelete={handleDelete}
          sx={{
            backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.5)"}`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: theme.shadows[1],
            borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
            minHeight: 32,
            width: "fit-content",
            px: 1,

            // responsive styles
            [theme.breakpoints.down("sm")]: {
              minHeight: 24,
              px: 0.5,
              "& .MuiTypography-root": {
                fontSize: "0.65rem", // smaller text on mobile
              },
              "& svg": {
                fontSize: "1rem",
              },
            },

            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },

            "& .MuiChip-deleteIcon": {
              color: "rgba(255, 255, 255, 0.75)",
              fontSize: "1rem",

              "&:hover": {
                color: "#fff",
              },

              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            },
          }}
        />
      ))}
    </Stack>
  );
}
