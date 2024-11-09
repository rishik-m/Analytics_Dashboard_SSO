import React from "react";
import CustomPieChart from "./PieChart";
import { useFetchTopPartnersData } from "../hooks/useFetchTopPartnersData";
import { localisable } from "../utils/localisable";

const PieChartCard: React.FC = () => {
  const topN = 5;
  const { data, isLoading, error } = useFetchTopPartnersData(topN);

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="ml-4 text-gray-500 text-lg">
          {localisable.loading.loadingData}
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p>{localisable.error.errorLoading}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <CustomPieChart data={data} />
    </div>
  );
};

export default PieChartCard;
