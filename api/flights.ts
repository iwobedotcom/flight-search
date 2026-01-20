import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAccessToken() {
  // Check if token is still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const res = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID!,
      client_secret: process.env.AMADEUS_CLIENT_SECRET!,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  accessToken = res.data.access_token;
  tokenExpiry = Date.now() + (res.data.expires_in - 60) * 1000; // Refresh 1 min early
  return accessToken;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { origin, destination, departureDate } = req.query;

    if (!origin || !destination || !departureDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const token = await getAccessToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v1/shopping/flight-offers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate,
          adults: 1,
          max: 20,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Amadeus API Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch flights",
    });
  }
}
