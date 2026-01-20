export interface FlightRow {
  id: string;

  airlineCode: string;
  airlineName: string;
  cabinClasses: string[];

  flightNumber: string;

  origin: string;
  destination: string;

  departureTime: string;
  arrivalTime: string;

  duration: string;
  stops: number;

  price: number;
  currency: string;
}
