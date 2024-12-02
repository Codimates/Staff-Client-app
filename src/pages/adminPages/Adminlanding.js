import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import Topbar from "../../componnets/AdminCompo/Topbar";
import Sidebar from "../../componnets/AdminCompo/Sidebar";
import SalesBarChart from "../../componnets/AdminCompo/SalesBarChart";
import SalesPieChart from "../../componnets/AdminCompo/SalesPieChart";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";

export default function AdminLanding() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-lg font-semibold text-gray-700 text-left">
            Hi, Welcome Back!
          </h1>

          {/* Top Cards Section */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-orange-600">
                Total Revenue
              </h3>
              <div>
                <GiReceiveMoney className="text-4xl font-bold text-orange ml-8" />
                <p className="text-gray-700 mt-2">Rs.856,750.00</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-orange-600">
                Total Sales
              </h3>
              <div>
                <AiOutlineDeliveredProcedure className="text-4xl font-bold text-orange ml-8" />
                <p className="text-gray-700 mt-2">1435</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-orange-600">
                Total Users
              </h3>
              <div>
                <FaUsers className="text-4xl font-bold text-orange ml-8" />
                <p className="text-gray-700 mt-2">250</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="flex flex-row gap-x-10 h-[400px]">
            <div className="flex-[0.7] bg-white shadow-lg rounded-lg">
              <SalesBarChart />
            </div>
            <div className="flex-[0.25] bg-white shadow-lg rounded-lg">
              <SalesPieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
