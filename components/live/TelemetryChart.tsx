import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TelemetryChartProps {
  data: any[];
  title: string;
  dataKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  yAxisDomain: [number, number];
}

export default function TelemetryChart({
  data,
  title,
  dataKeys,
  yAxisDomain,
}: TelemetryChartProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-red-600 to-red-400" />
      <CardHeader className="border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-red-600" />
          <CardTitle className="text-xl font-black text-white tracking-tight uppercase">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8 bg-zinc-900/50">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="time"
              stroke="#71717a"
              tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: 700 }}
            />
            <YAxis
              stroke="#71717a"
              tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: 700 }}
              domain={yAxisDomain}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "0px",
                fontWeight: 700,
              }}
              labelStyle={{ color: "#fff", fontWeight: 700 }}
            />
            <Legend
              wrapperStyle={{
                fontWeight: 700,
                fontSize: "14px",
              }}
            />
            {dataKeys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color}
                strokeWidth={3}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}