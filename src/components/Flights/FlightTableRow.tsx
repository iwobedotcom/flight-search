import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Chip,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import type { FlightRow } from "../../types/flight";
import { FlightRowDetails } from "./FlightRowDetails";

interface Props {
  row: FlightRow;
}

export function FlightTableRow({ row }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
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
              <Typography fontWeight={600}>{row.airlineName}</Typography>
              <Typography variant="caption">{row.flightNumber}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          {row.origin} → {row.destination}
        </TableCell>

        <TableCell>
          {new Date(row.departureTime).toLocaleTimeString()}
        </TableCell>

        <TableCell>
          <Chip
            label={row.stops === 0 ? "Non-stop" : `${row.stops} stop(s)`}
            color={row.stops === 0 ? "success" : "warning"}
            size="small"
          />
        </TableCell>

        <TableCell align="right">
          {row.currency} {row.price.toLocaleString()}
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
