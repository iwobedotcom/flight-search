import { Container, Box } from "@mui/material";
import { useState } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import type { SearchParams } from "../types/search";
import { useFlights } from "../hooks/useFlights";
import { FlightGrid } from "../components/FlightResults/FlightGrid";
import { useFlightFilters } from "../hooks/useFlightFilter";
import { FlightFilters } from "../components/FlightFilters/FlightFilters";
import { PriceGraph } from "../components/PriceGraph/PriceGraph";

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data = [], isLoading } = useFlights(searchParams);

  const { filters, setFilters, filteredRows } = useFlightFilters(data);

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <SearchForm onSearch={setSearchParams} />
      </Box>

      <PriceGraph rows={filteredRows} />

      <FlightFilters
        maxPrice={filters.maxPrice ?? 1000}
        selectedStops={filters.stops ?? []}
        onPriceChange={(value) =>
          setFilters((f) => ({ ...f, maxPrice: value }))
        }
        onStopsChange={(stops) => setFilters((f) => ({ ...f, stops }))}
      />

      <FlightGrid rows={filteredRows} loading={isLoading} />
    </Container>
  );
}
