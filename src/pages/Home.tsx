import { Container, Box } from "@mui/material";
import { useState } from "react";
import SearchForm from "../components/SearchForm";
import type { SearchParams } from "../types/search";
import { useFlights } from "../hooks/useFlights";
import { FlightGrid } from "../components/FlightResults/FlightGrid";
import { useFlightFilters } from "../hooks/useFlightFilter";
import { FlightFilters } from "../components/FlightFilters";
import { PriceGraph } from "../components/PriceGraph";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data = [], isLoading } = useFlights(searchParams);
  console.log("🚀 ~ Home ~ data:", JSON.stringify(data, null, 2));

  const { filters, setFilters, filteredRows } = useFlightFilters(data);

  if (isLoading) return <LoadingSkeleton />;

  // if (filteredRows.length === 0) {
  //   return <EmptyState />;
  // }

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
