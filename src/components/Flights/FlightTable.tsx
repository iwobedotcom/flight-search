import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import type { FlightRow } from "../../types/flight";
import { FlightTableRow } from "./FlightTableRow";
import {
  Airlines,
  AirlineStops,
  AttachMoney,
  FlightTakeoff,
  Map,
} from "@mui/icons-material";

interface Props {
  rows: FlightRow[];
  loading: boolean;
}

export function FlightTable({ rows, loading }: Props) {
  const theme = useTheme();
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer
      sx={{
        backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.5)"}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: theme.shadows[1],
        borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
        borderRadius: 2,
      }}
      component={Paper}
    >
      <Table
        sx={{
          "& .MuiTableCell-root": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(188, 184, 221, 1)"}`,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: theme.shadows[1],
              borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
            }}
          >
            <TableCell />
            <TableCell>
              <Box
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
              >
                <Airlines fontSize="small" />
                <Typography fontWeight={600} variant="body2">
                  Airline
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
              >
                <Map fontSize="small" />
                <Typography fontWeight={600} variant="body2">
                  Route
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
              >
                <FlightTakeoff fontSize="small" />
                <Typography fontWeight={600} variant="body2">
                  Departure
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
              >
                <AirlineStops fontSize="small" />
                <Typography fontWeight={600} variant="body2">
                  Stops
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
              >
                <AttachMoney fontSize="small" />
                <Typography fontWeight={600} variant="body2">
                  Price
                </Typography>
              </Box>
            </TableCell>
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
