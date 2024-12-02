import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AddInventory() {
  const [inventoryData, setInventoryData] = useState({
    brand_name: '',
    model_name: '',
    stock_level: '',
    price: '',
    ram: '',
    processor: '',
    graphics_card: '',
    special_offer: 'false', // Set default to false
  });

  const [imageFiles, setImageFiles] = useState([]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (imageFiles.length >= 3) {
      toast.error('You can upload a maximum of 3 images.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }

    setImageFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      toast.error('Please upload at least 1 image before submitting.');
      return;
    }

    const formData = new FormData();

    // Append form fields
    Object.entries(inventoryData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append images
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
     
      const response = await axios.post('/inventory/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data.message);

      // Clear form data
      setInventoryData({
        brand_name: '',
        model_name: '',
        stock_level: '',
        price: '',
        ram: '',
        processor: '',
        graphics_card: '',
        special_offer: 'false',
      });
      setImageFiles([]);

      
    } catch (error) {
      console.error('Detailed error:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Full error object:', error);
      toast.error(error.response?.data?.message || 'Error creating inventory');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-md md:p-6">
        <h1 className="mb-6 text-xl font-bold text-center md:text-2xl mt-10">Add Inventory</h1>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          {[
            { name: 'brand_name', placeholder: 'Brand Name' },
            { name: 'model_name', placeholder: 'Model Name' },
            { name: 'stock_level', placeholder: 'Stock Level', type: 'number' },
            { name: 'price', placeholder: 'Price', type: 'number' },
            { name: 'ram', placeholder: 'RAM' },
            { name: 'processor', placeholder: 'Processor' },
            { name: 'graphics_card', placeholder: 'Graphics Card' },
          ].map(({ name, placeholder, type = 'text' }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={inventoryData[name]}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300  hover:border-[#FFDA0A] rounded"
            />
          ))}

          {/* Special Offer Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="special_offer"
              checked={inventoryData.special_offer === 'true'}
              onChange={(e) => setInventoryData(prev => ({
                ...prev, 
                special_offer: e.target.checked ? 'true' : 'false'
              }))}
              className="mr-2"
            />
            <label>Special Offer</label>
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-24 border border-gray-300 rounded"
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
            className="w-full py-2 text-white bg-[#067CFD] hover:bg-[#232364] rounded  mt-1"
          >
            Add Inventory
          </button>
        </form>
      </div>
    </div>
  );
}