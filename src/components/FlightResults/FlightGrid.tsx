import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Collapse } from "@mui/material";
import { flightColumns } from "./columns";
import { FlightRowDetails } from "./FlightRowDetails";
import type { FlightRow } from "../../types/flight";

export function FlightGrid({
  rows,
  loading,
}: {
  rows: FlightRow[];
  loading: boolean;
}) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={flightColumns}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        onRowClick={(params) =>
          setExpandedRowId(
            expandedRowId === params.id ? null : String(params.id),
          )
        }
      />

      {expandedRowId && (
        <Collapse in>
          <FlightRowDetails row={rows.find((r) => r.id === expandedRowId)!} />
        </Collapse>
      )}
    </Box>
  );
}
