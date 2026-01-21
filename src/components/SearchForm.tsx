import dayjs from "dayjs";
import { useState, useEffect } from "react";
import type { SearchParams } from "../types/search";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Autocomplete,
  useTheme,
  useMediaQuery,
  createFilterOptions,
  Typography,
} from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import airportsData from "../data/airports.json";
import { useMemo } from "react";

import type { Airport } from "../types/airport";

const OPTIONS_LIMIT = 3;
const filter = createFilterOptions<Airport>({
  limit: OPTIONS_LIMIT,
});

interface Props {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
  initialParams?: SearchParams | null;
}

export default function SearchForm({
  onSearch,
  isLoading,
  initialParams,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState<SearchParams>({
    origin: initialParams?.origin || "",
    destination: initialParams?.destination || "",
    departureDate: initialParams?.departureDate || "",
    returnDate: initialParams?.returnDate || "",
  });

  // Sync form with initialParams when they change
  useEffect(() => {
    if (initialParams) {
      setForm({
        origin: initialParams.origin || "",
        destination: initialParams.destination || "",
        departureDate: initialParams.departureDate || "",
        returnDate: initialParams.returnDate || "",
      });
    }
  }, [initialParams]);

  // Memoize the list of airports to avoid re-calculating on every render
  // Only include airports with an IATA code
  const airports = useMemo(() => {
    return Object.values(airportsData as Record<string, Airport>).filter(
      (a) => a.iata && a.iata.length === 3,
    );
  }, []);

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

  const handleAirportChange =
    (field: "origin" | "destination") => (_: any, newValue: Airport | null) => {
      setForm({
        ...form,
        [field]: newValue ? newValue.iata : "",
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
        <Autocomplete
          fullWidth
          options={airports}
          filterOptions={filter}
          getOptionLabel={(option) =>
            `${option.city} (${option.iata}) - ${option.name}`
          }
          value={airports.find((a) => a.iata === form.origin) || null}
          onChange={handleAirportChange("origin")}
          slotProps={{
            popupIndicator: {
              sx: { display: "none" },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size={isMobile ? "small" : "medium"}
              label="Where from?"
              placeholder="(LTN) London"
            />
          )}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Box component="li" key={key} {...otherProps}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    paddingY: 0,
                  }}
                >
                  <Typography
                    fontWeight={550}
                    variant="body2"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      component="span"
                      mr={1}
                      fontWeight={550}
                      fontSize="1.1rem"
                    >
                      ({option.iata})
                    </Box>
                    <Box>{option.city}</Box>
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {option.state + ", " + option.country}
                  </Typography>
                </Box>
              </Box>
            );
          }}
          PaperComponent={(props) => (
            <Box
              {...props}
              sx={{
                backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.5)"}`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: theme.shadows[1],
                borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,

                borderRadius: 2,
              }}
            />
          )}
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

        <Autocomplete
          fullWidth
          options={airports}
          filterOptions={filter}
          getOptionLabel={(option) =>
            `${option.city} (${option.iata}) - ${option.name}`
          }
          value={airports.find((a) => a.iata === form.destination) || null}
          onChange={handleAirportChange("destination")}
          slotProps={{
            popupIndicator: {
              sx: { display: "none" },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size={isMobile ? "small" : "medium"}
              label="Where to?"
              placeholder="(JFK) New York"
            />
          )}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Box component="li" key={key} {...otherProps}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    paddingY: 0,
                  }}
                >
                  <Typography
                    fontWeight={550}
                    variant="body2"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      component="span"
                      mr={1}
                      fontWeight={550}
                      fontSize="1.1rem"
                    >
                      ({option.iata})
                    </Box>
                    <Box>{option.city}</Box>
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {option.state + ", " + option.country}
                  </Typography>
                </Box>
              </Box>
            );
          }}
          PaperComponent={(props) => (
            <Box
              {...props}
              sx={{
                backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.5)"}`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: theme.shadows[1],
                borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,

                borderRadius: 2,
              }}
            />
          )}
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
