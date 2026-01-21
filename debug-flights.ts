import axios from "axios";
import { transformFlightOffers } from "./src/utils/transformFlightOffers";

async function debugFlightSearch() {
  console.log("--- Starting Debug Script ---");

  const origin = "LHR";
  const destination = "JFK";
  const departureDate = "2026-02-01";

  const url = `http://localhost:3001/api/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}`;
  console.log(`Fetching from: ${url}`);

  try {
    const response = await axios.get(url);
    const data = response.data;

    console.log("--- API Response ---");
    console.log("Status:", response.status);
    console.log("Data type:", typeof data);
    console.log('Has "data" property?', !!data.data);
    console.log('Has "dictionaries" property?', !!data.dictionaries);

    if (data.data) {
      console.log(`Received ${data.data.length} flight offers.`);
    } else {
      console.error('ERROR: API response missing "data" property.');
      console.log("Full Response Keys:", Object.keys(data));
      return;
    }

    console.log("--- Running Transformation ---");
    try {
      const transformed = transformFlightOffers(data.data, data.dictionaries);
      console.log(`Successfully transformed ${transformed.length} flights.`);
      if (transformed.length > 0) {
        console.log(
          "First Flight Preview:",
          JSON.stringify(transformed[0], null, 2),
        );
      }
    } catch (err) {
      console.error("ERROR: Transformation failed.");
      console.error(err);
    }
  } catch (error) {
    console.error("ERROR: API Request failed.");
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Message:", error.message);
      console.error("Data:", error.response?.data);
    } else {
      console.error(error);
    }
  }
  console.log("--- Debug Script Finished ---");
}

import fs from "fs";
import util from "util";

const logFile = fs.createWriteStream("debug_output.txt", { flags: "w" });
const logStdout = process.stdout;

console.log = function (...args) {
  logFile.write(util.format.apply(null, args) + "\n");
  logStdout.write(util.format.apply(null, args) + "\n");
};
console.error = function (...args) {
  logFile.write(util.format.apply(null, args) + "\n");
  logStdout.write(util.format.apply(null, args) + "\n");
};

debugFlightSearch();
