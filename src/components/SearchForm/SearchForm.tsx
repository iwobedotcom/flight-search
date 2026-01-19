import dayjs from "dayjs";
import { useState } from "react";
import type { SearchParams } from "../../types/search";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  onSearch: (params: SearchParams) => void;
}

export default function SearchForm({ onSearch }: Props) {
  const [form, setForm] = useState<SearchParams>({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
  });

  const handleChange =
    (field: keyof SearchParams) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [field]: event.target.value,
      });
    };

  const handleSubmit = () => onSearch(form);

  const isDisabled = !form.origin || !form.destination || !form.departureDate;

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "repeat(5, 1fr)" }}
      gap={2}
      alignItems="center"
    >
      <TextField
        label="From"
        value={form.origin}
        onChange={handleChange("origin")}
        placeholder="e.g. Lagos"
        fullWidth
      />

      <TextField
        label="To"
        value={form.destination}
        onChange={handleChange("destination")}
        placeholder="e.g. New York"
        fullWidth
      />

      <TextField
        label="Departure"
        InputLabelProps={{ shrink: true }}
        value={form.departureDate}
        onChange={handleChange("departureDate")}
        type="date"
        fullWidth
      />

      <TextField
        label="Return"
        InputLabelProps={{ shrink: true }}
        value={form.returnDate}
        onChange={handleChange("returnDate")}
        type="date"
        fullWidth
        disabled={!form.departureDate}
        inputProps={{
          min: dayjs(form.departureDate).format("YYYY-MM-DD"),
        }}
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={isDisabled}
        sx={{ height: "56px" }}
      >
        Search
      </Button>
    </Box>
  );
}
