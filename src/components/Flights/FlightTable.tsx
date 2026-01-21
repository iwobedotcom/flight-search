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
  Pagination,
} from "@mui/material";
import { useState, useEffect } from "react";
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
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  if (loading) {
    return <CircularProgress />;
  }

  // Calculate pagination
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 when rows change (new search or filter applied)
  useEffect(() => {
    setPage(1);
  }, [rows.length]);

  return (
    <Box>
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
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Airlines fontSize="small" />
                  <Typography fontWeight={600} variant="body2">
                    Airline
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Map fontSize="small" />
                  <Typography fontWeight={600} variant="body2">
                    Route
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <FlightTakeoff fontSize="small" />
                  <Typography fontWeight={600} variant="body2">
                    Departure
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <AirlineStops fontSize="small" />
                  <Typography fontWeight={600} variant="body2">
                    Stops
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
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
            {paginatedRows.map((row) => (
              <FlightTableRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            gap: 2,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.9)"
                : "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: theme.shadows[1],
            borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
            borderRadius: 2,
            p: 1.2,
            width: 500,
            mx: "auto",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {startIndex + 1}-{Math.min(endIndex, rows.length)} of{" "}
            {rows.length} flights
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}
