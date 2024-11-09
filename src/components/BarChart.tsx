import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TradeRankData {
  Year: number;
  ReporterISO3: string;
  ReporterName: string;
  total_exports: number;
  rank: number;
}

interface CustomBarChartProps {
  data: TradeRankData[];
}

// Colors used for Chart
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#6a5acd"];

const CustomBarChart: React.FC<CustomBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="Year" />
        <YAxis
          reversed
          label={{ value: "Rank", angle: -90, position: "insideLeft" }}
        />
        <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
        <Legend />

        <Bar dataKey="rank" fill="url(#barGradient)">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
