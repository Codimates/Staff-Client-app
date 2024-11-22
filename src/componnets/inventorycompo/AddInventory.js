import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function AddInventory() {
  const { user, logout } = useContext(UserContext);

  // State to handle form inputs
  const [formData, setFormData] = useState({
    brand_name: "",
    model_name: "",
    stock_level: "",
    price: "",
    ram: "",
    processor: "",
    graphics_card: "",
    special_offer: false,
  });

  // State for file upload
  const [file, setFile] = useState(null);

  // State for feedback
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();

    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }
    if (file) {
      formDataWithFile.append("image", file);
    }

    try {
      const response = await axios.post(
        "/inventory/create",
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(`Inventory added successfully: ${response.data.message}`);
    } catch (error) {
      console.error("Error adding inventory:", error);
      setMessage("Failed to add inventory");
    }
  };
  

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <h1 className="mt-4 text-2xl font-bold text-gray-800">
        Welcome, {user.fname}
      </h1>
      <button
        onClick={logout}
        className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>

      <div className="w-full max-w-2xl p-6 mt-8 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">Add Inventory</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Brand Name</label>
            <input
              type="text"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Model Name</label>
            <input
              type="text"
              name="model_name"
              value={formData.model_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Stock Level</label>
            <input
              type="number"
              name="stock_level"
              value={formData.stock_level}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">RAM</label>
            <input
              type="text"
              name="ram"
              value={formData.ram}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Processor</label>
            <input
              type="text"
              name="processor"
              value={formData.processor}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Graphics Card</label>
            <input
              type="text"
              name="graphics_card"
              value={formData.graphics_card}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="special_offer"
              checked={formData.special_offer}
              onChange={(e) =>
                setFormData({ ...formData, special_offer: e.target.checked })
              }
              className="mr-2"
            />
            <label className="text-gray-700">Special Offer</label>
          </div>

          <div>
  <label className="block font-medium text-gray-700">Upload Images</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    required
    multiple // Allows multiple files to be selected
    className="block w-full text-gray-700 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
  />

</div>


          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Inventory
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
