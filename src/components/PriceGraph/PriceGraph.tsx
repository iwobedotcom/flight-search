import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import type { FlightRow } from "../../types/flight";

export function PriceGraph({ rows }: { rows: FlightRow[] }) {
  return (
    <LineChart width={600} height={250} data={rows}>
      <XAxis dataKey="departureTime" />
      <YAxis />
      <Tooltip />
      <Line dataKey="price" />
    </LineChart>
  );
}
