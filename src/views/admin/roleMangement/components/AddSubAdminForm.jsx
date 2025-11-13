import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaUserPlus, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const AddSubAdminForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm transition-all duration-300">
      <div className="my-6 w-full max-w-lg rounded-2xl border border-blue-100 bg-white p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-blue-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-3 shadow-lg shadow-blue-500/30">
              <FaUserPlus className="text-lg text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Add Sub Admin
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:rotate-90 hover:bg-red-100 hover:text-red-600"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Admin Name */}
          <div className="flex flex-col">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaUser className="text-blue-500" />
              Admin Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="Enter admin name"
              className="rounded-lg border-2 border-blue-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaEnvelope className="text-blue-500" />
              Email Address
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="rounded-lg border-2 border-blue-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaLock className="text-blue-500" />
              Password
              <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter secure password"
              className="rounded-lg border-2 border-blue-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              required
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-blue-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border-2 border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/40 sm:w-auto"
            >
              <FaUserPlus />
              Save Sub Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubAdminForm;
