import { Box, Slider, Checkbox, FormControlLabel } from "@mui/material";

interface Props {
  maxPrice: number;
  selectedStops: number[];
  onPriceChange: (value: number) => void;
  onStopsChange: (stops: number[]) => void;
}

export function FlightFilters({
  maxPrice,
  selectedStops,
  onPriceChange,
  onStopsChange,
}: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box>
        <strong>Max Price</strong>
        <Slider
          value={maxPrice}
          min={100}
          max={1000}
          onChange={(_, v) => onPriceChange(v as number)}
        />
      </Box>

      <Box>
        <strong>Stops</strong>
        {[0, 1, 2].map((stop) => (
          <FormControlLabel
            key={stop}
            control={
              <Checkbox
                checked={selectedStops.includes(stop)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...selectedStops, stop]
                    : selectedStops.filter((s) => s !== stop);

                  onStopsChange(next);
                }}
              />
            }
            label={`${stop} stop`}
          />
        ))}
      </Box>
    </Box>
  );
}
