import React, { useState, useEffect } from "react";

const UserDetailsModal = ({ showModal, onClose, user, onEdit, onDelete }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        status: user.status || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    onDelete(user.id);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
    setIsEditable(false);
    onClose();
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-2/3 max-w-4xl min-h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">User Details</div>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded shadow hover:bg-gray-400"
          >
            Close
          </button>
        </div>

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  User Name
                </label>
                {isEditable ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                ) : (
                  <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                    {formData.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  Email Address
                </label>
                {isEditable ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                ) : (
                  <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                    {formData.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  Phone Number
                </label>
                {isEditable ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                ) : (
                  <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                    {formData.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  User Role
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                  {formData.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  Status
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                  {formData.status}
                </p>
              </div>
            </div>

            <div className="flex space-x-5 mt-4 justify-center">
              <button
                type="submit"
                className="w-1/6 border-2 border-orange-500 text-orange-600 px-4 py-2 rounded shadow hover:bg-orange-500 hover:text-white"
              >
                Save
              </button>

              {isEditable ? (
                <button
                  type="button"
                  onClick={() => setIsEditable(false)}
                  className="w-1/6 bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500"
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="w-1/6 border-2 border-orange-500 text-orange-600 px-4 py-2 rounded shadow hover:bg-orange-500 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-1/6 border-2 border-orange-500 text-orange-600 px-4 py-2 rounded shadow hover:bg-orange-500 hover:text-white"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </form>
        ) : (
          <div>Loading user details...</div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
