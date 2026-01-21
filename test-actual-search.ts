import axios from "axios";

async function testActualSearch() {
  console.log("--- Testing Actual Search (LTN to NRT) ---");

  const url = `http://localhost:3001/api/flights?origin=LTN&destination=NRT&departureDate=2026-01-22&returnDate=2026-01-30`;
  console.log(`Fetching from: ${url}`);

  try {
    const response = await axios.get(url);
    const data = response.data;

    console.log("Status:", response.status);
    console.log("Response keys:", Object.keys(data));
    console.log('Has "data" property?', !!data.data);
    console.log('Has "dictionaries" property?', !!data.dictionaries);

    if (data.data) {
      console.log(`Received ${data.data.length} flight offers.`);
      console.log("First offer keys:", Object.keys(data.data[0] || {}));
    } else {
      console.log("No data property found");
      console.log("Full response:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Error data:", error.response?.data);
    } else {
      console.error(error);
    }
  }
}

testActualSearch();
