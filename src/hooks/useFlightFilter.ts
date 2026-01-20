import { useMemo, useState } from "react";
import type { FlightFilters } from "../types/filters";
import type { FlightRow } from "../types/flight";

export function useFlightFilters(rows: FlightRow[]) {
  const [filters, setFilters] = useState<FlightFilters>({
    stops: [],
    airlines: [],
    cabinClasses: [],
  });

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (filters.maxPrice && row.price > filters.maxPrice) return false;

      if (filters.stops?.length && !filters.stops.includes(row.stops))
        return false;

      if (
        filters.airlines?.length &&
        !filters.airlines.includes(row.airlineCode)
      )
        return false;

      if (
        filters.cabinClasses?.length &&
        !filters.cabinClasses.some((cabin) => row.cabinClasses.includes(cabin))
      )
        return false;

      return true;
    });
  }, [rows, filters]);

  return {
    filters,
    setFilters,
    filteredRows,
  };
}
