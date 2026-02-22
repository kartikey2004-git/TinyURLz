/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--primary) / 0.8)",
  "hsl(var(--primary) / 0.6)",
  "hsl(var(--primary) / 0.4)",
  "hsl(var(--primary) / 0.2)",
  "hsl(var(--muted))",
];

export default function Device({ stats }) {
  const deviceCount = stats?.reduce((acc, item) => {
    const key = item.device || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const result = Object.entries(deviceCount || {}).map(([device, count]) => ({
    device,
    count,
  }));

  const hasData = result.length > 0 && stats.length > 0;

  return (
    <div className="w-full h-[300px]">
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={result}
              labelLine={false}
              outerRadius={80}
              dataKey="count"
              nameKey="device"
              stroke="none"
            >
              {result.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconSize={0}
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground text-sm italic">
            Waiting for device data...
          </p>
        </div>
      )}
    </div>
  );
}
