import dayjs from "dayjs";
import { useState } from "react";
import type { SearchParams } from "../types/search";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";

interface Props {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
        backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.5)"}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: theme.shadows[1],
        borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
        padding: 3,
        borderRadius: 2,
      }}
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr auto 1fr 1fr 1fr 1fr" }}
      gap={2}
      alignItems="center"
    >
      {/* FROM + SWAP + TO - only flex on mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "contents" }, // flex only on mobile
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          size={isMobile ? "small" : "medium"}
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
              color: "primary.main",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <SwapHoriz />
          </IconButton>
        </Tooltip>

        <TextField
          size={isMobile ? "small" : "medium"}
          label="To"
          value={form.destination}
          onChange={handleChange("destination")}
          placeholder="e.g. JFK"
          inputProps={{ maxLength: 3 }}
          fullWidth
        />
      </Box>

      <TextField
        size={isMobile ? "small" : "medium"}
        label="Departure"
        InputLabelProps={{ shrink: true }}
        value={form.departureDate}
        onChange={handleChange("departureDate")}
        type="date"
        fullWidth
        InputProps={{
          sx: {
            color: theme.palette.text.secondary,
          },
        }}
      />

      <TextField
        size={isMobile ? "small" : "medium"}
        label="Return"
        InputLabelProps={{ shrink: true }}
        value={form.returnDate}
        onChange={handleChange("returnDate")}
        type="date"
        fullWidth
        disabled={!form.departureDate}
        inputProps={{
          min: dayjs(form.departureDate).format("YYYY-MM-DD"),
          sx: {
            color: theme.palette.text.secondary,
          },
        }}
      />

      <Button
        size={isMobile ? "small" : "medium"}
        variant="contained"
        onClick={handleSubmit}
        disabled={isDisabled}
        sx={{ height: { xs: "42px", md: "56px" } }}
      >
        {isLoading ? "Searching..." : "Search Flights"}
      </Button>
    </Box>
  );
}
