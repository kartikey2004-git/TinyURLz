/* eslint-disable react/prop-types */

import { green } from "@mui/material/colors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LocationStats({ stats }) {
  const cityCount = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else {
      acc[item.city] = 1;
    }

    return acc;
  }, {});

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        width={700}
        height={300}
        data={cities.slice(0, 5)}
        margin={{ top: 20 }}
        accessibilityLayer
      >
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip labelStyle={{ color: green }} />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#82ca9d"></Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
