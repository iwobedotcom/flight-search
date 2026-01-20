import axios from "axios";

export async function fetchFlights(params: {
  origin: string;
  destination: string;
  departureDate: string;
}) {
  const res = await axios.get("/api/flights", {
    params: {
      origin: params.origin,
      destination: params.destination,
      departureDate: params.departureDate,
    },
  });

  return res.data;
}
