import { useMemo } from "react";

export function useFlightData(data: any[]) {
  const airlines = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach((row) => {
      if (!map.has(row.airlineCode)) {
        map.set(row.airlineCode, row.airlineName);
      }
    });
    return Array.from(map, ([code, name]) => ({ code, name }));
  }, [data]);

  const cabinOptions = useMemo(() => {
    const set = new Set<string>();
    data.forEach((row) => {
      row.cabinClasses?.forEach((cabin: string) => set.add(cabin));
    });
    return Array.from(set);
  }, [data]);

  const cheapestFlights = useMemo(() => {
    if (!data || data.length === 0) return [];
    return [...data].sort((a, b) => a.price - b.price).slice(0, 3);
  }, [data]);

  return { airlines, cabinOptions, cheapestFlights };
}
