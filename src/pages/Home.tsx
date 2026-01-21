import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import SearchForm from "../components/SearchForm";
import type { SearchParams } from "../types/search";
import { useFlights } from "../hooks/useFlights";
import { useFlightFilters } from "../hooks/useFlightFilter";
import { FlightFilters } from "../components/FlightFilters";
import { FlightsChips } from "../components/FlightsChips";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { FlightTable } from "../components/Flights/FlightTable";
import { clearStored, loadWithTTL, saveWithTTL } from "../utils/storage";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const theme = useTheme();
  // Default search parameters to ensure users see data on first visit
  const defaultSearchParams: SearchParams = {
    origin: "LHR",
    destination: "JFK",
    departureDate: "2026-02-01",
    returnDate: "",
  };

  const [searchParams, setSearchParams] = useState<SearchParams | null>(() => {
    const stored = loadWithTTL<SearchParams>("flight-search");
    return stored || defaultSearchParams;
  });

  const storedFlights = loadWithTTL<any[]>("flight-results");
  const {
    data = storedFlights ?? [],
    isLoading,
    isError,
  } = useFlights(searchParams);

  const { filters, setFilters, filteredRows } = useFlightFilters(data);

  useEffect(() => {
    if (searchParams) {
      saveWithTTL("flight-search", searchParams);
    }
  }, [searchParams]);

  useEffect(() => {
    const storedFilters = loadWithTTL("flight-filters");
    if (storedFilters) {
      setFilters(storedFilters);
    }
  }, []);

  useEffect(() => {
    saveWithTTL("flight-filters", filters);
  }, [filters]);

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
      row.cabinClasses.forEach((cabin: string) => set.add(cabin));
    });

    return Array.from(set);
  }, [data]);

  const cheapestFlights = useMemo(() => {
    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => a.price - b.price).slice(0, 3);
  }, [data]);

  const hasSearch = Boolean(searchParams);
  const hasResults = filteredRows.length > 0;

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }} my={4}>
        <SearchForm
          onSearch={setSearchParams}
          isLoading={isLoading}
          initialParams={searchParams}
        />

        {cheapestFlights.length > 0 && (
          <FlightsChips flights={cheapestFlights} />
        )}
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
                onClick={() => {
                  setFilters({});
                  setSearchParams(null);
                  clearStored("flight-search");
                  clearStored("flight-filters");
                  clearStored("flight-results");
                }}
              >
                Reset
              </Button>
            </Tooltip>
          </Box>

          <FlightFilters
            maxPrice={filters.maxPrice ?? 10000}
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
          // sx={{
          //   backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.5)"}`,
          //   backdropFilter: "blur(10px)",
          //   WebkitBackdropFilter: "blur(10px)",
          //   boxShadow: theme.shadows[1],
          //   borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
          //   borderRadius: 2,
          // }}
        >
          {isLoading && <LoadingSkeleton variant="table" count={1} />}

          {!isLoading && isError && (
            <ErrorState
              title="Something went wrong"
              message="We couldn’t fetch flight results. Please try again."
              onRetry={() =>
                searchParams && setSearchParams({ ...searchParams })
              }
            />
          )}

          {!isLoading && !isError && !hasSearch && (
            <EmptyState
              title="Search for flights"
              message="Enter your origin, destination, and dates to see available flights."
            />
          )}

          {!isLoading && !isError && hasSearch && !hasResults && (
            <EmptyState
              title="No flights found"
              message="Try adjusting your dates or filters to see more results."
            />
          )}

          {!isLoading && !isError && hasResults && (
            <FlightTable rows={filteredRows} loading={false} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
