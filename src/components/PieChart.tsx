import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatNumber } from "../utils/numberFormatter";
import { localisable } from "../utils/localisable";

interface AggregatedTradeData {
  partner: string;
  totalTradeValue: number;
}

interface CustomPieChartProps {
  data: AggregatedTradeData[];
}

// Colors used for the chart
const COLORS = [
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#00C49F",
  "#FFBB33",
  "#FF6384",
  "#36A2EB",
  "#FF9F40",
];

const CustomPieChart: React.FC<CustomPieChartProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-xl font-semibold text-gray-700">
        {localisable.dashboard.topTradingPartners}
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalTradeValue"
            nameKey="partner"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            fill="#82ca9d"
            paddingAngle={5}
            label={({ name, value }) => `${name}: ${formatNumber(value)}`}
            isAnimationActive
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatNumber(value)} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: "14px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
