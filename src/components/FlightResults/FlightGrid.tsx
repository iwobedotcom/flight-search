import { DataGrid } from "@mui/x-data-grid";
import { flightColumns } from "./columns";
import type { FlightRow } from "../../types/flight";

interface Props {
  rows: FlightRow[];
  loading: boolean;
}

export function FlightGrid({ rows, loading }: Props) {
  return (
    <DataGrid
      rows={rows}
      columns={flightColumns}
      loading={loading}
      autoHeight
      pageSizeOptions={[5, 10, 20]}
      disableRowSelectionOnClick
    />
  );
}
