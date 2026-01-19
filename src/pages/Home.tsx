import { Box, Container } from "@mui/material";
import type { SearchParams } from "../types/search";
import SearchForm from "../components/SearchForm/SearchForm";

export default function Home() {
  const handleSearch = (params: SearchParams) => {
    console.log("Search params:", params);
  };

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <SearchForm onSearch={handleSearch} />
      </Box>
    </Container>
  );
}
