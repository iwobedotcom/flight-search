import { Container, Box } from "@mui/material";
import { useState } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import type { SearchParams } from "../types/search";
import { useFlights } from "../hooks/useFlights";

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const flightsQuery = useFlights(searchParams);

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <SearchForm onSearch={setSearchParams} />
      </Box>

      {flightsQuery.isLoading && <div>Loading flights...</div>}
      {flightsQuery.isError && <div>Failed to load flights</div>}
      {flightsQuery.data && (
        <pre>{JSON.stringify(flightsQuery.data, null, 2)}</pre>
      )}
    </Container>
  );
}
