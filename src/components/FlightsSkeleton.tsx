import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";

const FlightsSkeleton = () => {
  const theme = useTheme();
  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "hidden",
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
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width={100} height={20} />
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
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width={100} height={20} />
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
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width={100} height={20} />
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
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width={100} height={20} />
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
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width={100} height={20} />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: 10 }).map((_, idx) => (
              <TableRow sx={{ overflowX: "hidden" }} key={idx} hover>
                <TableCell>
                  <Skeleton variant="circular" width={20} height={20} />
                </TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width={100} height={20} />
                  </Box>
                </TableCell>

                <TableCell>
                  <Skeleton variant="text" width={100} height={20} />
                </TableCell>

                <TableCell>
                  <Skeleton variant="text" width={100} height={20} />
                </TableCell>

                <TableCell>
                  <Skeleton variant="text" width={100} height={20} />
                </TableCell>

                <TableCell align="right">
                  <Skeleton variant="text" width={100} height={20} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FlightsSkeleton;
