import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import axios from 'axios';
import AddBrands from './AddBrands';

const BrandList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch brand data
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('inventory/brand/getallbrands'); // API Gateway endpoint
        setBrands(response.data);
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrand();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow mt-10">
        <div className="mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Brand Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#067CFD] hover:bg-[#232364]"
              onClick={openModal}
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Add Brand
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => window.location.reload()}
            >
              <LuRefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Brands Table */}
        {isLoading ? (
          <p className="text-gray-500 text-center">Loading brands...</p>
        ) : brands.length === 0 ? (
          <p className="text-gray-500 text-center">No brands available.</p>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {brands
                  .filter((brand) =>
                    brand.brandname?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((brand) => (
                    <tr key={brand.brand_id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {brand.brandlogo ? (
                          <img
                            src={brand.brandlogo}
                            alt={brand.brandname}
                            className="h-10 w-10 rounded-full object-cover mx-auto"
                          />
                        ) : (
                          "No Logo"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {brand.brandname || "Unknown Brand"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Scrollable Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-2xl h-4/5 p-4 overflow-y-auto bg-white rounded shadow-lg">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
              >
                &times;
              </button>
              <AddBrands />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandList;
