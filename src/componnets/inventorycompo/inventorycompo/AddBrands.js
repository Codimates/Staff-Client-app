import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AddBrands() {
  const [brandData, setBrandData] = useState({
    brandname: '',
    brandlogo: '',
  });

  const [logoFile, setLogoFile] = useState(null);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandData({ ...brandData, [name]: value });
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setBrandData((prevData) => ({
        ...prevData,
        brandlogo: reader.result, // Base64 string
      }));
      setLogoFile(file);
    };
    reader.onerror = () => toast.error('Error reading file.');
    reader.readAsDataURL(file);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandData.brandname || !brandData.brandlogo) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('/inventory/brand/create', brandData);
      toast.success(response.data.message);
      setBrandData({ brandname: '', brandlogo: '' }); // Reset form
      setLogoFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating brand');
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Add Brand</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="brandname" className="block text-sm font-medium text-gray-700">
            Brand Name
          </label>
          <input
            type="text"
            id="brandname"
            name="brandname"
            value={brandData.brandname}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
            placeholder="Enter brand name"
            required
          />
        </div>

        <div>
          <label htmlFor="brandlogo" className="block text-sm font-medium text-gray-700">
            Brand Logo
          </label>
          <input
            type="file"
            id="brandlogo"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 mt-1 border rounded"
            required
          />
          {logoFile && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Selected file: {logoFile.name}</p>
              <img
                src={brandData.brandlogo}
                alt="Brand Logo Preview"
                className="object-cover w-32 h-32 mt-2 rounded"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
}
