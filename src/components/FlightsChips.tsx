import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { FlightRow } from "../types/flight";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FlightTakeoff } from "@mui/icons-material";

interface Props {
  flights: FlightRow[];
}

export function FlightsChips({ flights }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography
        variant="body1"
        color="background.paper"
        sx={{ fontWeight: 500, ml: 1, mb: 1 }}
      >
        Cheapest Flights
      </Typography>

      <Stack
        direction="row"
        spacing={isMobile ? 0 : 1}
        flexWrap="wrap"
        rowGap={isMobile ? 0 : 1}
      >
        {flights.map((flight) => (
          <Chip
            key={flight.id}
            size="small"
            label={
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize="small"
                  fontWeight={550}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {flight.origin}
                  <FlightTakeoff sx={{ mx: 0.5 }} fontSize="small" />
                  {flight.destination}
                </Typography>

                <Typography
                  variant="body2"
                  color="primary"
                  fontSize="small"
                  fontWeight={600}
                >
                  {flight.currency} {flight.price.toFixed(2)}
                </Typography>
              </Box>
            }
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.9)"
                  : "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: theme.shadows[1],
              borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
              minHeight: 32,
              px: 1,

              [theme.breakpoints.down("sm")]: {
                minHeight: 24,
                px: 0.5,
                "& .MuiTypography-root": {
                  fontSize: "0.65rem",
                },
                "& svg": {
                  fontSize: "1rem",
                },
              },

              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
