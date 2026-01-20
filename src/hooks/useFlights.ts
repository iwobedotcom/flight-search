import { useQuery } from "@tanstack/react-query";
import { fetchFlights } from "../amadeus";
import type { SearchParams } from "../types/search";

export function useFlights(params: SearchParams | null) {
  return useQuery({
    queryKey: ["flights", params],
    queryFn: () =>
      fetchFlights({
        origin: params!.origin,
        destination: params!.destination,
        departureDate: params!.departureDate,
      }),
    enabled: !!params,
    staleTime: 5 * 60 * 1000,
  });
}
