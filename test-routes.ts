import axios from "axios";

async function testMultipleRoutes() {
  const routes = [
    {
      origin: "LTN",
      destination: "NRT",
      date: "2026-01-22",
      name: "London Luton → Tokyo Narita",
    },
    {
      origin: "LHR",
      destination: "JFK",
      date: "2026-02-01",
      name: "London Heathrow → New York JFK",
    },
    {
      origin: "LAX",
      destination: "JFK",
      date: "2026-02-01",
      name: "Los Angeles → New York JFK",
    },
    {
      origin: "SFO",
      destination: "LAX",
      date: "2026-02-01",
      name: "San Francisco → Los Angeles",
    },
  ];

  for (const route of routes) {
    console.log(`\n--- Testing: ${route.name} ---`);
    const url = `http://localhost:3001/api/flights?origin=${route.origin}&destination=${route.destination}&departureDate=${route.date}`;

    try {
      const response = await axios.get(url);
      const flightCount = response.data?.data?.length || 0;
      console.log(
        `✅ ${route.origin} → ${route.destination}: ${flightCount} flights`,
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `❌ ${route.origin} → ${route.destination}: ${error.response?.status} - ${error.message}`,
        );
      } else {
        console.error(`❌ ${route.origin} → ${route.destination}: ${error}`);
      }
    }
  }
}

testMultipleRoutes();
