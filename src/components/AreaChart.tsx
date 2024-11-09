import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "../utils/numberFormatter";
import { localisable } from "../utils/localisable";

type AreaChartProps = {
  data: any[];
};

const AreaChartComponent: React.FC<AreaChartProps> = ({ data }) => {
  const customTooltipFormatter = (value: number, name: string, props: any) => {
    const country =
      props.payload?.CountryName || localisable.dashboard.unknownCountry;
    return [`${formatNumber(value)}`, `${country}`];
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Year" />
        <YAxis tickFormatter={formatNumber} />
        <Tooltip formatter={customTooltipFormatter} />
        <Legend />
        {data.length > 0 &&
          Array.from(new Set(data.map((item) => item.country))).map(
            (country) => (
              <Area
                key={country}
                type="monotone"
                dataKey="CumulativeTradeValue"
                stackId="1"
                stroke="#000000"
                fillOpacity={0.6}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            )
          )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
