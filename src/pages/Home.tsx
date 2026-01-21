import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import SearchForm from "../components/SearchForm";
import type { SearchParams } from "../types/search";
import { useFlights } from "../hooks/useFlights";
import { useFlightFilters } from "../hooks/useFlightFilter";
import { FlightFilters } from "../components/FlightFilters";
import { FlightsChips } from "../components/FlightsChips";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { FlightTable } from "../components/Flights/FlightTable";

export default function Home() {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data = [], isLoading } = useFlights(searchParams);

  const { filters, setFilters, filteredRows } = useFlightFilters(data);

  const airlinesFromData = useMemo(() => {
    const map = new Map<string, string>();

    data.forEach((row) => {
      if (!map.has(row.airlineCode)) {
        map.set(row.airlineCode, row.airlineName);
      }
    });

    return Array.from(map, ([code, name]) => ({
      code,
      name,
    }));
  }, [data]);

  const cabinOptions = useMemo(() => {
    const set = new Set<string>();

    data.forEach((row) => {
      row.cabinClasses.forEach((cabin) => set.add(cabin));
    });

    return Array.from(set);
  }, [data]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} my={4}>
        <SearchForm onSearch={setSearchParams} isLoading={isLoading} />

        <FlightsChips />
      </Box>

      <Grid container spacing={2}>
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.5)"}`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: theme.shadows[1],
            borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
            p: 2,
            borderRadius: 2,
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

            {/* Reset Button */}
            <Tooltip title="Reset">
              <Button
                variant="text"
                sx={{
                  color: theme.palette.primary.main,
                  p: 0,
                  right: 0,
                  position: "absolute",
                }}
                onClick={() => setFilters({})}
              >
                Reset
              </Button>
            </Tooltip>
          </Box>
          {/* <PriceGraph rows={filteredRows} /> */}

          <FlightFilters
            maxPrice={filters.maxPrice ?? 1000}
            selectedStops={filters.stops ?? []}
            selectedAirlines={filters.airlines ?? []}
            selectedCabins={filters.cabinClasses ?? []}
            airlines={airlinesFromData}
            cabins={cabinOptions ?? []}
            onPriceChange={(v) => setFilters((f) => ({ ...f, maxPrice: v }))}
            onStopsChange={(v) => setFilters((f) => ({ ...f, stops: v }))}
            onAirlinesChange={(v) => setFilters((f) => ({ ...f, airlines: v }))}
            onCabinChange={(v) =>
              setFilters((f) => ({ ...f, cabinClasses: v }))
            }
          />
        </Grid>

        <Grid
          size={{ xs: 12, md: 9 }}
          sx={{
            backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.5)"}`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: theme.shadows[1],
            borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
            p: 2,
            borderRadius: 2,
          }}
        >
          {isLoading ? (
            <LoadingSkeleton variant="table" count={1} />
          ) : (
            <>
              <FlightTable rows={filteredRows} loading={isLoading} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
