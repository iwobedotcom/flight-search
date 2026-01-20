import dayjs from "dayjs";
import { useState } from "react";
import type { SearchParams } from "../types/search";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";

interface Props {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: Props) {
  const [form, setForm] = useState<SearchParams>({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
  });

  const handleChange =
    (field: keyof SearchParams) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (field === "origin" || field === "destination") {
        value = value.toUpperCase().slice(0, 3);
      }
      setForm({
        ...form,
        [field]: value,
      });
    };

  const handleSwap = () => {
    setForm({
      ...form,
      origin: form.destination,
      destination: form.origin,
    });
  };

  const handleSubmit = () => onSearch(form);

  const isDisabled = !form.origin || !form.destination || !form.departureDate;

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        padding: 3,
        borderRadius: 2,
      }}
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr auto 1fr 1fr 1fr 1fr" }}
      gap={2}
      alignItems="center"
    >
      <TextField
        label="From"
        value={form.origin}
        onChange={handleChange("origin")}
        placeholder="e.g. LOS"
        inputProps={{ maxLength: 3 }}
        fullWidth
      />

      <Tooltip title="Swap origin and destination">
        <IconButton
          onClick={handleSwap}
          disabled={!form.origin && !form.destination}
          sx={{
            alignSelf: "center",
            mt: { xs: 0, md: 1 },
            color: "primary.main",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <SwapHoriz />
        </IconButton>
      </Tooltip>

      <TextField
        label="To"
        value={form.destination}
        onChange={handleChange("destination")}
        placeholder="e.g. JFK"
        inputProps={{ maxLength: 3 }}
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
        {isLoading ? <CircularProgress size={20} /> : "Search Flights"}
      </Button>
    </Box>
  );
}
