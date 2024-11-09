import React from "react";
import clsx from "clsx";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { localisable } from "../utils/localisable";

interface TopbarProps {
  isSidebarCollapsed: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ isSidebarCollapsed }) => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 h-16 flex items-center px-6 transition-all duration-300 z-50",
        isSidebarCollapsed ? "ml-20" : "ml-64",
        "bg-blue-100 shadow-md"
      )}
    >
      <h1 className="text-2xl font-bold text-blue-600">
        {localisable.dashboard.dashboard}
      </h1>
      <div className="flex-grow" />
      <div className="flex items-center space-x-6">
        <FaBell className="text-xl text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" />
        <FaUserCircle className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" />
      </div>
    </div>
  );
};

export default Topbar;
