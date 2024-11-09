import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import clsx from "clsx";
import { navItems } from "../utils/nav";
import { localisable } from "../utils/localisable";

interface SidebarProps {
  selectedItem: string;
  onSelectItem: (item: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedItem,
  onSelectItem,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { user, logout, isAuthenticated } = useAuth0();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggleCollapse = () => setIsCollapsed((prev) => !prev);
  const handleMobileToggle = () => setIsMobileOpen(!isMobileOpen);

  const defaultProfilePic = "https://www.w3schools.com/w3images/avatar2.png"; // Profile image

  return (
    <>
      <button
        onClick={handleMobileToggle}
        className="fixed top-4 left-4 z-50 text-2xl text-blue-600 md:hidden"
      >
        <FaBars />
      </button>
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleMobileToggle}
      />
      <div
        className={clsx(
          "fixed h-screen text-black flex flex-col items-center py-6 z-50 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          "bg-blue-100"
        )}
      >
        <button
          onClick={handleToggleCollapse}
          className="text-white text-2xl mb-6 self-end mr-4 hover:text-blue-300 hidden md:block"
        >
          {isCollapsed ? <FaBars /> : <FaChevronLeft />}
        </button>
        {isAuthenticated && user && (
          <div className="flex flex-col items-center mb-10">
            <img
              src={defaultProfilePic}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-2 transition-all duration-300"
            />
            {!isCollapsed && (
              <h2 className="text-lg font-semibold">{user.name}</h2>
            )}
          </div>
        )}
        <nav className="flex-grow w-full px-4 flex flex-col h-full">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onSelectItem(item.key);
                if (isMobileOpen) setIsMobileOpen(false);
              }}
              className={clsx(
                "flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 hover:bg-blue-500",
                selectedItem === item.key && "bg-blue-500"
              )}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </button>
          ))}
          {isAuthenticated && (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className={clsx(
                "flex items-center w-full px-4 py-3 mt-auto rounded-lg transition-all duration-200 hover:bg-red-500 bg-red-400",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <span className="text-xl mr-3">
                <RiLogoutBoxRLine />
              </span>
              {!isCollapsed && <span>{localisable.dashboard.logout}</span>}
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
