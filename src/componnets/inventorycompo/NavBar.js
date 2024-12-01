import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineInventory2 } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

const NavBar = () => {
  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:block min-h-screen w-64 bg-[#F3F3F6] text-black p-4 fixed left-0 top-250 ">
        <div className="flex flex-col space-y-2">
          {/* Dashboard Link */}
          <Link
            to="/inventorymanagerdash"
            className="p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-4 mt-10 pl-5 "
          >
            <MdOutlineDashboard className="text-xl" />
            <span >Dashboard</span>
          </Link>

          {/* Inventory Link */}
          <Link
            to="/inventory"
            className="p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-4 pl-5"
          >
            <MdOutlineInventory2 className="text-xl" />
            <span>Inventory</span>
          </Link>

          {/* My Profile Link */}
          <Link
            to="/my-profile"
            className="p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-4 pl-5"
          >
            <FaRegUser className="text-xl" />
            <span>My Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
