import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Chip,
  Avatar,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import type { FlightRow } from "../../types/flight";
import { FlightRowDetails } from "./FlightRowDetails";

interface Props {
  row: FlightRow;
}

export function FlightTableRow({ row }: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              src={`/airlines/${row.airlineCode}.png`}
              alt={row.airlineName}
            />
            <Box>
              <Typography variant="body2" lineHeight={0.7} fontWeight={600}>
                {row.airlineName}
              </Typography>
              <Typography variant="caption">{row.flightNumber}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Typography variant="caption" lineHeight={0.7}>
            {row.origin} → {row.destination}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption" lineHeight={0.7}>
            {new Date(row.departureTime).toLocaleTimeString()}
          </Typography>
        </TableCell>

        <TableCell>
          <Chip
            label={row.stops === 0 ? "Non-stop" : `${row.stops} Stop(s)`}
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              border: `1px solid #b7b3fe`,
              fontSize: "0.75rem",
              p: 0.5,
            }}
            size="small"
          />
        </TableCell>

        <TableCell align="right">
          <Typography variant="caption" lineHeight={0.7}>
            {row.currency} {row.price.toLocaleString()}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <FlightRowDetails row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
