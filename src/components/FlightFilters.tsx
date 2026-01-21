import {
  Box,
  Slider,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";

interface Props {
  maxPrice: number;
  selectedStops: number[];
  selectedAirlines: string[];
  selectedCabins: string[];
  airlines: { code: string; name: string }[];
  cabins: string[];

  onPriceChange: (value: number) => void;
  onStopsChange: (stops: number[]) => void;
  onAirlinesChange: (codes: string[]) => void;
  onCabinChange: (cabins: string[]) => void;
}

export function FlightFilters({
  maxPrice,
  selectedStops,
  selectedAirlines,
  selectedCabins,
  airlines,
  cabins,
  onPriceChange,
  onStopsChange,
  onAirlinesChange,
  onCabinChange,
}: Props) {
  const formatPrice = (value: number) => {
    return `$${value.toLocaleString("en-US")}`;
  };

  return (
    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Price */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Price
          </Typography>
          <Typography variant="body2" color="primary.main" fontWeight={700}>
            {formatPrice(maxPrice)}
          </Typography>
        </Box>
        <Slider
          size="small"
          value={maxPrice}
          min={100}
          max={1000}
          step={10}
          onChange={(_, v) => onPriceChange(v as number)}
          valueLabelDisplay="auto"
          valueLabelFormat={formatPrice}
          sx={{
            "& .MuiSlider-valueLabel": {
              fontSize: "0.875rem",
              fontWeight: 600,
              backgroundColor: "primary.main",
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            {formatPrice(100)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatPrice(1000)}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Stops */}
      <Box>
        <Typography variant="subtitle1" fontWeight={600}>
          Stops
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[0, 1, 2].map((stop) => {
            const labels = ["Non-Transit", "1 Stop", "2 Stops"];
            return (
              <FormControlLabel
                key={stop}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedStops.includes(stop)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...selectedStops, stop]
                        : selectedStops.filter((s) => s !== stop);

                      onStopsChange(next);
                    }}
                    sx={{
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                    }}
                  />
                }
                label={labels[stop]}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.913rem",
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Divider />

      {/* Airlines */}
      <Box>
        <Typography fontWeight={600}>Airlines</Typography>
        {airlines.map((airline) => (
          <FormControlLabel
            key={airline.code}
            control={
              <Checkbox
                size="small"
                checked={selectedAirlines.includes(airline.code)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...selectedAirlines, airline.code]
                    : selectedAirlines.filter((a) => a !== airline.code);
                  onAirlinesChange(next);
                }}
              />
            }
            label={airline.name}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.913rem",
                textTransform: "capitalize",
              },
            }}
          />
        ))}
      </Box>

      <Divider />

      {/* Cabin Class */}
      <Box>
        <Typography fontWeight={600}>Class</Typography>
        {cabins.map((cabin) => (
          <FormControlLabel
            key={cabin}
            control={
              <Checkbox
                size="small"
                checked={selectedCabins.includes(cabin)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...selectedCabins, cabin]
                    : selectedCabins.filter((c) => c !== cabin);
                  onCabinChange(next);
                }}
              />
            }
            label={cabin}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.913rem",
                textTransform: "capitalize",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
