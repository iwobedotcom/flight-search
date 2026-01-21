import { IconButton, Avatar, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { GridColDef } from "@mui/x-data-grid";

export const flightColumns: GridColDef[] = [
  {
    field: "expand",
    headerName: "",
    width: 50,
    sortable: false,
    renderCell: (params) => (
      <IconButton size="small">
        <ExpandMoreIcon />
      </IconButton>
    ),
  },
  {
    field: "airlineName",
    headerName: "Airline",
    flex: 1,
    renderCell: (params) => (
      <Chip
        avatar={<Avatar>{params.row.airlineCode}</Avatar>}
        label={params.value}
        variant="outlined"
      />
    ),
  },
  {
    field: "flightNumber",
    headerName: "Flight",
    width: 120,
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    renderCell: (params) => (
      <strong>
        {params.row.currency} {params.value}
      </strong>
    ),
  },
];
