import { Container, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import type { SearchParams } from "../types/search";
import { useFlights } from "../hooks/useFlights";
import { useFlightFilters } from "../hooks/useFlightFilter";
import { FiltersSidebar } from "../components/FiltersSidebar";
import { FlightContent } from "../components/FlightContent";
import { FlightsChips } from "../components/FlightsChips";
import { useFlightData } from "../hooks/useFlightData";
import { loadWithTTL, saveWithTTL, clearStored } from "../utils/storage";

const DEFAULT_SEARCH_PARAMS: SearchParams = {
  origin: "LHR",
  destination: "JFK",
  departureDate: "2026-02-01",
  returnDate: "",
};

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(() => {
    return loadWithTTL<SearchParams>("flight-search") || DEFAULT_SEARCH_PARAMS;
  });

  const storedFlights = loadWithTTL<any[]>("flight-results");
  const {
    data = storedFlights ?? [],
    isLoading,
    isError,
  } = useFlights(searchParams);
  const { filters, setFilters, filteredRows } = useFlightFilters(data);
  const { airlines, cabinOptions, cheapestFlights } = useFlightData(data);

  // Persist search params
  useEffect(() => {
    if (searchParams) {
      saveWithTTL("flight-search", searchParams);
    }
  }, [searchParams]);

  // Load and persist filters
  useEffect(() => {
    const storedFilters = loadWithTTL("flight-filters");
    if (storedFilters) {
      setFilters(storedFilters);
    }
  }, []);

  useEffect(() => {
    saveWithTTL("flight-filters", filters);
  }, [filters]);

  const handleReset = () => {
    setFilters({});
    setSearchParams(null);
    clearStored("flight-search");
    clearStored("flight-filters");
    clearStored("flight-results");
  };

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
        <FiltersSidebar
          filters={filters}
          setFilters={setFilters}
          airlines={airlines}
          cabinOptions={cabinOptions}
          onReset={handleReset}
        />

        <Grid size={{ xs: 12, md: 9 }}>
          <FlightContent
            isLoading={isLoading}
            isError={isError}
            hasSearch={Boolean(searchParams)}
            hasResults={filteredRows.length > 0}
            flights={filteredRows}
            onRetry={() => searchParams && setSearchParams({ ...searchParams })}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
