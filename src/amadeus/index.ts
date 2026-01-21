import axios from "axios";

export async function fetchFlights(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();

  try {
    const res = await axios.get(`/api/flights?${query}`);
    return res.data;
  } catch (error) {
    console.error("❌ fetchFlights error:", error);
    throw new Error("Failed to fetch flights");
  }
}
