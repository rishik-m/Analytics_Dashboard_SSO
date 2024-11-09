import { FaTachometerAlt, FaUser, FaChartLine, FaCog } from "react-icons/fa";

export const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
  { name: "Profile", icon: <FaUser />, key: "profile" },
  { name: "Reports", icon: <FaChartLine />, key: "reports" },
  { name: "Settings", icon: <FaCog />, key: "settings" },
];

export const navPaths = {
  home: "/",
  dashboard: "/dashboard",
};
