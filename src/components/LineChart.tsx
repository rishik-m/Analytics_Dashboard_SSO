import React from "react";
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
import { formatNumber } from "../utils/numberFormatter";
import { localisable } from "../utils/localisable";

interface DataPoint {
  ReporterISO3: string;
  ReporterName: string;
  Year: number;
  AnnualTradeValue: number;
}

interface CustomLineChartProps {
  data: DataPoint[];
  selectedCountry?: string | null;
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  data,
  selectedCountry,
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A90E2" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#FF6F61" stopOpacity={0.8} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis
          dataKey="Year"
          label={{ value: "Year", position: "insideBottom", offset: -5 }}
          stroke="#666"
        />
        <YAxis
          tickFormatter={(value) => `${formatNumber(value)}`}
          stroke="#666"
        />
        <Tooltip
          formatter={(value: number) => `$${formatNumber(value)}`}
          labelFormatter={(year: number) => `Year: ${year}`}
          contentStyle={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "10px",
          }}
          cursor={{ strokeDasharray: "3 3" }}
        />

        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="AnnualTradeValue"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={{ r: 5, fill: "#4A90E2", strokeWidth: 2, stroke: "#ffffff" }}
          activeDot={{ r: 8, fill: "#FF6F61" }}
          animationDuration={1500}
          name={selectedCountry || localisable.dashboard.tradeData}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
