import React from "react";
import CustomLineChart from "./LineChart";
import { FaFilter } from "react-icons/fa";
import { localisable } from "../utils/localisable";

interface LineChartCardProps {
  data: any[];
  selectedCountry: string | null;
  onCountryChange: (value: string | null) => void;
  uniqueCountries: string[];
}

const LineChartCard: React.FC<LineChartCardProps> = ({
  data,
  selectedCountry,
  onCountryChange,
  uniqueCountries,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <div className="p-6 bg-gradient-to-r from-blue-400 to-blue-500 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold">
            {localisable.dashboard.annualTradeValue}
          </h2>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
            <select
              value={selectedCountry || ""}
              onChange={(e) => onCountryChange(e.target.value || null)}
              className="appearance-none bg-blue-500 bg-opacity-80 text-white py-2 pl-10 pr-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="">{localisable.dashboard.allCountries}</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        <CustomLineChart data={data} selectedCountry={selectedCountry} />
      </div>
    </div>
  );
};

export default LineChartCard;
