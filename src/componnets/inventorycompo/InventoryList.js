import React, { useState, useEffect } from 'react';

import { FaPlus, FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { FiEdit2, FiTrash2 ,FiEye} from "react-icons/fi";
import axios from 'axios';
import AddInventory from './AddInventory';

const InventoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ setIsViewModalOpen]=useState(false);
  const [setSelectedInventory]=useState(null);
  const [viewMode, setViewMode] = useState('desktop');
 

  // Responsive view mode detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewMode('mobile');
      } else if (width < 1024) {
        setViewMode('tablet');
      } else {
        setViewMode('desktop');
      }
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for screen size changes
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // New method to handle view functionality
  const handleViewInventory = async (inventoryId) => {
    try {
      const response = await axios.get(`/inventory/getbyid/${inventoryId}`);
      setSelectedInventory(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch inventory details:", error);
      // Optional: Add user-friendly error handling
    }
  };

  // const closeViewModal = () => {
  //   setIsViewModalOpen(false);
  //   setSelectedInventory(null);
  // };

  // Fetch inventory data
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/inventory/getalllaps');
        setInventories(response.data);
        setSelectedInventory(response.data);
        setIsViewModalOpen(true);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [setSelectedInventory, setIsViewModalOpen]);


   // Tablet View Rendering (New)
   const TabletInventoryView = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      {inventories
        .filter((inventory) =>
          inventory.model_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((inventory) => (
          <div 
            key={inventory.inventory_id} 
            className="bg-white shadow rounded-lg p-3 flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-base">{inventory.model_name}</span>
              <div className="flex space-x-2">
              <button 
                className="text-blue-600 hover:text-blue-900"
                onClick={() => handleViewInventory(inventory.inventory_id)}
              >
                <FiEye className="h-4 w-4" />
              </button>
                <button className="text-blue-600 hover:text-blue-900">
                  <FiEdit2 className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="font-medium">Brand:</div>
              <div>{inventory.brand_name}</div>
              
              <div className="font-medium">Product ID:</div>
              <div>{inventory.product_id}</div>
              
              <div className="font-medium">RAM:</div>
              <div>{inventory.ram} GB</div>
              
              <div className="font-medium">Price:</div>
              <div>${parseFloat(inventory.price).toFixed(2)}</div>
              
              <div className="font-medium">Stock:</div>
              <div>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    inventory.stock_level > 10
                      ? 'bg-green-100 text-green-800'
                      : inventory.stock_level > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {inventory.stock_level > 0
                    ? `${inventory.stock_level} units`
                    : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  // Mobile View Rendering
  const MobileInventoryView = () => (
    <div className="space-y-4 p-4">
      {inventories
        .filter((inventory) =>
          inventory.model_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((inventory) => (
          <div 
            key={inventory.inventory_id} 
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">{inventory.model_name}</span>
              <div className="flex space-x-2">
              <button 
                className="text-blue-600 hover:text-blue-900"
                onClick={() => handleViewInventory(inventory.inventory_id)}
              >
                <FiEye className="h-4 w-4" />
              </button>
                <button className="text-blue-600 hover:text-blue-900">
                  <FiEdit2 className="h-5 w-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Brand:</div>
              <div>{inventory.brand_name}</div>
              
              <div className="font-medium">Product ID:</div>
              <div>{inventory.product_id}</div>
              
              <div className="font-medium">RAM:</div>
              <div>{inventory.ram} GB</div>
              
              <div className="font-medium">Price:</div>
              <div>${parseFloat(inventory.price).toFixed(2)}</div>
              
              <div className="font-medium">Stock:</div>
              <div>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    inventory.stock_level > 10
                      ? 'bg-green-100 text-green-800'
                      : inventory.stock_level > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {inventory.stock_level > 0
                    ? `${inventory.stock_level} units`
                    : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  // Desktop View Rendering (existing table view)
  const DesktopInventoryView = () => (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Existing table header and body */}
        <thead className="bg-gray-50 hidden md:table-header-group">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Inventory ID
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product ID
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Brand Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              RAM
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inventories
            .filter((inventory) =>
              inventory.model_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((inventory) => (
              <tr key={inventory.inventory_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{inventory.inventory_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{inventory.product_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{inventory.model_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inventory.brand_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inventory.ram} GB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${parseFloat(inventory.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            inventory.stock_level > 10
                              ? 'bg-green-100 text-green-800'
                              : inventory.stock_level > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {inventory.stock_level > 0
                            ? `${inventory.stock_level} units`
                            : 'Out of stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">

                      <button className="text-blue-600 hover:text-blue-900 mr-4"
                            onClick={() => handleViewInventory(inventory.inventory_id)}
                  >
                    <FiEye className="h-4 w-4" />
                  </button>
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
  );



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Header */}
      <div className="bg-white shadow mt-10">
        <div className="mx-auto px-4 py-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Responsive Action Bar */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <button
              className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#067CFD] hover:bg-[#232364]"
              onClick={openModal}
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Add Product
            </button>
            <button
              className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mt-2 md:mt-0"
              onClick={() => window.location.reload()}
            >
              <LuRefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </button>
          </div>
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conditional Rendering based on Loading and Data */}
        {isLoading ? (
          <p className="text-gray-500 text-center">Loading products...</p>
        ) : inventories.length === 0 ? (
          <p className="text-gray-500 text-center">No products available.</p>
        ) : (
           // Conditionally render views based on screen size
          viewMode === 'mobile' ? (
            <MobileInventoryView />
          ) : viewMode === 'tablet' ? (
            <TabletInventoryView />
          ) : (
            <DesktopInventoryView />
          )
        )}

        {/* Scrollable Modal (Unchanged) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-2xl h-4/5 p-4 overflow-y-auto bg-white rounded shadow-lg">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
              >
                &times;
              </button>
            
              <AddInventory />
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default InventoryList;