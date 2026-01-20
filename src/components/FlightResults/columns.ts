import type { GridColDef } from "@mui/x-data-grid";

export const flightColumns: GridColDef[] = [
  { field: "airlineName", headerName: "Airline", flex: 1 },

  { field: "flightNumber", headerName: "Flight", width: 120 },

  { field: "origin", headerName: "From", width: 90 },
  { field: "destination", headerName: "To", width: 90 },

  {
    field: "departureTime",
    headerName: "Departure",
    flex: 1,
    valueFormatter: (value) => new Date(value as string).toLocaleString(),
  },
  {
    field: "arrivalTime",
    headerName: "Arrival",
    flex: 1,
    valueFormatter: (value) => new Date(value as string).toLocaleString(),
  },

  { field: "stops", headerName: "Stops", width: 90 },

  {
    field: "price",
    headerName: "Price",
    width: 120,
    valueFormatter: (value) => `€${value}`,
  },
];
