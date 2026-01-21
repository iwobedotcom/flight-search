import { transformFlightOffers } from "./src/utils/transformFlightOffers";

const mockOffer = {
  id: "1",
  itineraries: [
    {
      duration: "PT2H",
      segments: [
        {
          departure: { iataCode: "LHR", at: "2026-02-01T10:00:00" },
          arrival: { iataCode: "JFK", at: "2026-02-01T12:00:00" },
          carrierCode: "BA",
          number: "123",
        },
      ],
    },
  ],
  price: { currency: "EUR", grandTotal: "100.00" },
  travelerPricings: [],
  oneWay: true,
  numberOfBookableSeats: 9,
};

console.log("Testing valid data...");
try {
  const result = transformFlightOffers([mockOffer], {
    carriers: { BA: "British Airways" },
  });
  console.log("Valid data success:", result.length === 1);
} catch (e) {
  console.error("Valid data failed:", e.message);
}

console.log("Testing missing dictionaries...");
try {
  const result = transformFlightOffers([mockOffer], undefined);
  console.log(
    "Missing dictionaries success:",
    result.length === 1 && result[0].airlineName === "BA",
  );
} catch (e) {
  console.error("Missing dictionaries failed:", e.message);
}

console.log("Testing missing offers...");
try {
  const result = transformFlightOffers(undefined, {});
  console.log("Missing offers success:", result.length === 0);
} catch (e) {
  console.error("Missing offers failed:", e.message);
}

console.log("Testing empty offers...");
try {
  const result = transformFlightOffers([], {});
  console.log("Empty offers success:", result.length === 0);
} catch (e) {
  console.error("Empty offers failed:", e.message);
}
