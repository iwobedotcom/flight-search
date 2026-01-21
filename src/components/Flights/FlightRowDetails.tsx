import { Box, Chip, Typography, Divider, useTheme } from "@mui/material";
import type { FlightRow } from "../../types/flight";

interface Props {
  row: FlightRow;
}

export function FlightRowDetails({ row }: Props) {
  const theme = useTheme();
  return (
    <Box
      p={3}
      sx={{
        backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "#d3c1df"}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: theme.shadows[1],
        borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Flight Details
      </Typography>

      <Box display="flex" gap={1} flexWrap="wrap">
        {row.cabinClasses.map((cabin) => (
          <Chip key={cabin} label={cabin} />
        ))}

        <Chip
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            border: `1px solid #b7b3fe`,
          }}
          label={row.oneWay ? "One-way" : "Return"}
          color="info"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2">
        Available seats: <strong>{row.bookableSeats}</strong>
      </Typography>

      <Typography variant="body2">
        Checked baggage: <strong>{row.checkedBags}</strong>
      </Typography>

      <Typography variant="body2">
        Carry-on baggage: <strong>{row.cabinBags}</strong>
      </Typography>
    </Box>
  );
}
