import { useQuery } from "@tanstack/react-query";
import { fetchFlights } from "../amadeus";
import { transformFlightOffers } from "../utils/transformFlightOffers";

import type { SearchParams } from "../types/search";

export function useFlights(searchParams: SearchParams | null) {
  return useQuery({
    queryKey: ["flights", searchParams],
    queryFn: () => {
      if (!searchParams) throw new Error("Search params required");

      const params: Record<string, string> = {
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureDate: searchParams.departureDate,
      };

      if (searchParams.returnDate) {
        params.returnDate = searchParams.returnDate;
      }

      return fetchFlights(params);
    },
    select: (response) =>
      transformFlightOffers(response.data, response.dictionaries),
    enabled:
      !!searchParams &&
      Boolean(searchParams.origin && searchParams.destination),
  });
}
