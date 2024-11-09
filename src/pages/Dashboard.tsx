import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useFetchAnnualData } from "../hooks/useFetchAnnualData";
import DashboardMetrics from "../components/DashboardMetrics";
import LineChartCard from "../components/LineChartCard";
import BarChartCard from "../components/BarChartCard";
import PieChartCard from "../components/PieChartCard";
import AreaChartCard from "../components/AreaChartCard";
import { localisable } from "../utils/localisable";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useFetchAnnualData();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const uniqueCountries = data
    ? Array.from(new Set(data.map((item) => item.ReporterName)))
    : [];

  const filteredData = selectedCountry
    ? data?.filter((item) => item.ReporterName === selectedCountry)
    : data;

  const totalTrades = filteredData ? filteredData.length : 0;
  const avgTradeValue =
    filteredData && filteredData.length > 0
      ? filteredData.reduce((sum, item) => sum + item.AnnualTradeValue, 0) /
        filteredData.length
      : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          <p className="mt-4 text-lg font-semibold text-gray-500">
            {localisable.loading.loadingDashboard}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <p className="text-lg font-semibold text-red-500">
          {localisable.error.errorLoading}
        </p>
      </div>
    );
  }

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <Sidebar
        selectedItem={selectedItem}
        onSelectItem={handleSelectItem}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 overflow-y-auto ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Topbar isSidebarCollapsed={isSidebarCollapsed} />

        <div className="p-6 md:p-8 min-h-screen space-y-8 pt-[77px] md:pt-[80px]">
          <div className="container mx-auto max-w-5xl space-y-6">
            <DashboardMetrics
              totalTrades={totalTrades}
              avgTradeValue={avgTradeValue}
            />
            <LineChartCard
              data={filteredData || []}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              uniqueCountries={uniqueCountries}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BarChartCard />
              <PieChartCard />
            </div>
            <AreaChartCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
