import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Function to check if the current route matches the item's route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex">
      <div className="w-64 bg-white text-[#19191A] flex flex-col">
        <nav className="flex-1 p-6">
          <ul className="space-y-5">
            {/* Dashboard Link */}
            <li
              className={`py-2 px-4 rounded flex items-center ${
                isActive("/admindash") ? "bg-orange-600 text-white" : "hover:bg-orange-600 hover:text-white"
              }`}
            >
              <MdDashboard className="text-xl mr-6" />
              <Link to="/admindash" className="block text-left">
                Dashboard
              </Link>
            </li>

            {/* Users Link */}
            <li
              className={`py-2 px-4 rounded flex items-center ${
                isActive("/users") ? "bg-orange-600 text-white" : "hover:bg-orange-600 hover:text-white"
              }`}
            >
              <FaUser className="text-xl mr-6" />
              <Link to="/users" className="block text-left">
                Users
              </Link>
            </li>

            {/* Profile Link */}
            <li
              className={`py-2 px-4 rounded flex items-center ${
                isActive("/profile") ? "bg-orange-600 text-white" : "hover:bg-orange-600 hover:text-white"
              }`}
            >
              <MdManageAccounts className="text-xl mr-6" />
              <Link to="/profile" className="block text-left">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="w-0.5 bg-orange-600 h-full"></div>
    </div>
  );
};

export default Sidebar;
