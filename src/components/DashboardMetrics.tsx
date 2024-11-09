import React from "react";
import { localisable } from "../utils/localisable";

interface MetricsProps {
  totalTrades: number;
  avgTradeValue: number;
}

const DashboardMetrics: React.FC<MetricsProps> = ({
  totalTrades,
  avgTradeValue,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
      <p className="text-lg font-semibold">
        {localisable.dashboard.totalTrades}
      </p>
      <p className="text-4xl font-bold mt-2">{totalTrades}</p>
    </div>
    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
      <p className="text-lg font-semibold">
        {localisable.dashboard.averageTradeValue}
      </p>
      <p className="text-4xl font-bold mt-2">${avgTradeValue.toFixed(2)}</p>
    </div>
  </div>
);

export default DashboardMetrics;
