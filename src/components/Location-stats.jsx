/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LocationStats({ stats = [] }) {
  const cityCount = stats.reduce((acc, item) => {
    const city = item.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city: city.length > 15 ? city.slice(0, 12) + "..." : city,
    count,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={cities.slice(0, 5)}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <XAxis
            dataKey="city"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            interval={0}
            angle={-20}
            textAnchor="end"
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              color: "hsl(var(--foreground))",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            itemStyle={{ color: "hsl(var(--primary))" }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{
              color: "hsl(var(--muted-foreground))",
              fontSize: "0.875rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
