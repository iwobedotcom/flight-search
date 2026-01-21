import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import type { FlightRow } from "../../types/flight";

export function FlightRowDetails({ row }: { row: FlightRow }) {
  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Chip label={`Cabin: ${row.cabinClasses.join(", ")}`} />
        <Chip label={row.oneWay ? "One Way" : "Round Trip"} />
        <Chip label={`Stops: ${row.stops}`} />
        <Chip label={`Duration: ${row.duration}`} />
        <Chip label={`Seats left: ${row.bookableSeats}`} />
        <Chip label={`Checked bags: ${row.checkedBags}`} />
        <Chip label={`Cabin bags: ${row.cabinBags}`} />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" color="text.secondary">
        Route: {row.origin} → {row.destination}
      </Typography>
    </Box>
  );
}
