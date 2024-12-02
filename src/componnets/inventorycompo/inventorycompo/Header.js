import React, { useContext, useState } from 'react';
import LOGO from '../../Images/logo.png';
import { FaGripLines } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { UserContext } from '../../context/UserContext';
import USER from '../../Images/user.jpg'; // Default user image
import { Link } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineInventory2 } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, logout, loading } = useContext(UserContext);

  const renderUserSection = () => {
    if (loading) {
      return <span>Loading...</span>;
    }
    if (user) {
      const userImage = user.image || USER; // Use user.image if available, otherwise fallback to default USER image
      return (
        <div className="flex flex-col items-center">
          <img
            src={userImage}
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-white text-sm mt-2">
            {user.fname} {user.lname}
          </span>
        </div>
      );
    }
    return <span>Sign In</span>;
  };

  // Toggle the dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="bg-[#1A1A1D] shadow-md">
      <div className="flex items-center justify-between px-6 py-3 md:px-10">
        {/* Logo */}
        <img src={LOGO} alt="Logo" className="h-[60px]" />

        {/* Desktop Menu */}
        <div className="items-center hidden space-x-8 md:flex">
          {/* User Profile Button */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="items-center px-4 py-2 text-white transition-all duration-300"
            >
              {renderUserSection()}
            </button>
          </div>
          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 text-white transition-all duration-300 border border-gray-500 rounded-lg hover:bg-gray-700 hover:shadow-lg"
          >
            <CiLogout className="mr-2" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex md:hidden">
          <button onClick={toggleDropdown} className="text-white">
            <FaGripLines size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isDropdownOpen && (
        <div className="flex flex-col items-center px-6 py-3 bg-[#2A2A2D] md:hidden">
          <Link
            className="w-full py-2 text-left text-white transition-colors duration-300 hover:text-gray-300 flex "
            to="/inventorymanagerdash"
          >
            <MdOutlineDashboard className="text-xl mr-3" />
            Dashboard
          </Link>
          <Link
            className="w-full py-2 text-left text-white transition-colors duration-300 hover:text-gray-300 flex"
            to="/my-profile"
          >
             <FaRegUser className="text-xl mr-3" />
            My Profile
          </Link>
          <Link
            className="w-full py-2 text-left text-white transition-colors duration-300 hover:text-gray-300 flex"
            to="/inventory"
          >
            <MdOutlineInventory2 className="text-xl mr-3" />
            Inventories
          </Link>
          <br></br>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 mt-2 text-white transition-all duration-300 border border-gray-500 rounded-lg hover:bg-gray-700 hover:shadow-lg"
          >
            <CiLogout className="mr-2" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
