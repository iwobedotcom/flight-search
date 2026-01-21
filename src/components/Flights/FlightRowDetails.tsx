import { Box, Chip, Typography, Divider } from "@mui/material";
import type { FlightRow } from "../../types/flight";

interface Props {
  row: FlightRow;
}

export function FlightRowDetails({ row }: Props) {
  return (
    <Box p={3} bgcolor="grey.50">
      <Typography fontWeight={600} gutterBottom>
        Flight Details
      </Typography>

      <Box display="flex" gap={1} flexWrap="wrap">
        {row.cabinClasses.map((cabin) => (
          <Chip key={cabin} label={cabin} />
        ))}

        <Chip label={row.oneWay ? "One-way" : "Return"} color="info" />

        <Chip label={`${row.bookableSeats} seats left`} color="warning" />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2">
        Duration: <strong>{row.duration}</strong>
      </Typography>

      <Typography variant="body2">
        Checked baggage: <strong>{row.checkedBags}</strong>
      </Typography>

      <Typography variant="body2">
        Cabin baggage: <strong>{row.cabinBags}</strong>
      </Typography>
    </Box>
  );
}
