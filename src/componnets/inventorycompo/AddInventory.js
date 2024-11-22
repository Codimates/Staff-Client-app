import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AddInventory() {
  const { user, logout } = useContext(UserContext);

  const [inventoryData, setInventoryData] = useState({
    brand_name: '',
    model_name: '',
    stock_level: '',
    price: '',
    ram: '',
    processor: '',
    graphics_card: '',
    special_offer: '',
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return; // No file selected
    }

    if (imageFiles.length >= 3) {
      toast.error('You can upload a maximum of 3 images.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setInventoryData((prevState) => ({
        ...prevState,
        images: [...prevState.images, reader.result],
      }));
      setImageFiles((prevFiles) => [...prevFiles, file]);
    };
    reader.onerror = () => toast.error('Error loading file');
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setInventoryData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inventoryData.images.length === 0) {
      toast.error('Please upload at least 1 image before submitting.');
      return;
    }

    try {
      const response = await axios.post('/inventory/create', inventoryData);
      toast.success(response.data.message); // Display success notification
      // Clear form after successful submission
      setInventoryData({
        brand_name: '',
        model_name: '',
        stock_level: '',
        price: '',
        ram: '',
        processor: '',
        graphics_card: '',
        special_offer: '',
        images: [],
      });
      setImageFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating inventory'); // Display error notification
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-4 text-xl font-bold">Welcome, {user.fname}</h1>
      <button
        onClick={logout}
        className="px-4 py-2 mb-6 text-white bg-red-500 rounded"
      >
        Logout
      </button>

      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Add Inventory</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="brand_name"
            placeholder="Brand Name"
            value={inventoryData.brand_name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="model_name"
            placeholder="Model Name"
            value={inventoryData.model_name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="stock_level"
            placeholder="Stock Level"
            value={inventoryData.stock_level}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={inventoryData.price}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="ram"
            placeholder="RAM"
            value={inventoryData.ram}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="processor"
            placeholder="Processor"
            value={inventoryData.processor}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="graphics_card"
            placeholder="Graphics Card"
            value={inventoryData.graphics_card}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="special_offer"
            placeholder="Special Offer"
            value={inventoryData.special_offer}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex gap-4 mt-4">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="object-cover w-24 h-24 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Inventory
          </button>
        </form>
      </div>
    </div>
  );
}
