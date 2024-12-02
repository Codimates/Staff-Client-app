import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import LogoImage from "../../images/logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import ProfileImage from "../../images/user.png"

const Topbar = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <div className="bg-[#1A1A1D] shadow-md p-4 flex justify-between items-center">
      <div>
        <img src={LogoImage} alt="Logo" className="h-[52px]" />
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-white">
          <h1 className="text-xl font-semibold">{user.fname}</h1>
        </div>
        <img src={ProfileImage} className="w-12 h-12 rounded-full"/>

        <button
          onClick={logout}
          className="px-5 py-2 flex items-center space-x-2 text-white bg-[#1A1A1D] border-2 border-white rounded hover:bg-orange-700 hover:border-orange-700"
        >
          <CiLogout className="text-xl font-bold" />
          <span className="font-semibold">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
