import type { FlightRow } from "../types/flight";

export function transformFlightOffers(
  offers: any[],
  dictionaries: any,
): FlightRow[] {
  return offers.map((offer) => {
    const itinerary = offer.itineraries[0];
    const segments = itinerary.segments;

    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    const airlineCode = firstSegment.carrierCode;

    return {
      id: offer.id,

      airlineCode,
      airlineName: dictionaries.carriers?.[airlineCode] ?? airlineCode,

      flightNumber: `${airlineCode}${firstSegment.number}`,

      origin: firstSegment.departure.iataCode,
      destination: lastSegment.arrival.iataCode,

      departureTime: firstSegment.departure.at,
      arrivalTime: lastSegment.arrival.at,

      duration: itinerary.duration,
      stops: segments.length - 1,

      price: Number(offer.price.grandTotal),
      currency: offer.price.currency,
    };
  });
}
