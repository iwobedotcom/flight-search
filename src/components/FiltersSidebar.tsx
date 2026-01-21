import {
  Box,
  Grid,
  Typography,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import { FlightFilters } from "./FlightFilters";

interface FiltersSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  airlines: Array<{ code: string; name: string }>;
  cabinOptions: string[];
  onReset: () => void;
}

export function FiltersSidebar({
  filters,
  setFilters,
  airlines,
  cabinOptions,
  onReset,
}: FiltersSidebarProps) {
  const theme = useTheme();

  return (
    <Grid
      size={{ xs: 12, md: 3 }}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.9)"
            : "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: theme.shadows[1],
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        p: 2,
        borderRadius: 2,
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="h6">Flight Filters</Typography>
        <Tooltip title="Reset">
          <Button
            variant="text"
            sx={{
              color: theme.palette.primary.main,
              p: 0,
              right: 0,
              position: "absolute",
            }}
            onClick={onReset}
          >
            Reset
          </Button>
        </Tooltip>
      </Box>

      <FlightFilters
        maxPrice={filters.maxPrice ?? 1000}
        selectedStops={filters.stops ?? []}
        selectedAirlines={filters.airlines ?? []}
        selectedCabins={filters.cabinClasses ?? []}
        airlines={airlines}
        cabins={cabinOptions}
        onPriceChange={(v) => setFilters((f: any) => ({ ...f, maxPrice: v }))}
        onStopsChange={(v) => setFilters((f: any) => ({ ...f, stops: v }))}
        onAirlinesChange={(v) =>
          setFilters((f: any) => ({ ...f, airlines: v }))
        }
        onCabinChange={(v) =>
          setFilters((f: any) => ({ ...f, cabinClasses: v }))
        }
      />
    </Grid>
  );
}
