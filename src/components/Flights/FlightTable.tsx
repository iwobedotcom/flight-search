import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import type { FlightRow } from "../../types/flight";
import { FlightTableRow } from "./FlightTableRow";

interface Props {
  rows: FlightRow[];
  loading: boolean;
}

export function FlightTable({ rows, loading }: Props) {
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Airline</TableCell>
            <TableCell>Route</TableCell>
            <TableCell>Departure</TableCell>
            <TableCell>Stops</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <FlightTableRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
