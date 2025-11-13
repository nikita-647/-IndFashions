import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaBan, FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const AdminTable = ({ searchTerm = "", updateStats }) => {
  const [admin, setAdmin] = useState([
    {
      _id: "1",
      adminName: "Aayushi Chauhan",
      email: "aayushi@example.com",
      role: "sub admin",
      status: "Active",
    },
    {
      _id: "2",
      adminName: "Rahul Verma",
      email: "rahul@example.com",
      role: "sub admin",
      status: "Blocked",
    },
    {
      _id: "3",
      adminName: "Neha Sharma",
      email: "neha@example.com",
      role: "sub admin",
      status: "Deleted",
    },
  ]);

  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAdminData, setEditAdminData] = useState(null);
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    role: "",
    status: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Update stats whenever admin data changes
  useEffect(() => {
    if (updateStats) {
      updateStats(admin);
    }
  }, [admin, updateStats]);

  const filteredAdmin = admin.filter((admin) =>
    `${admin.adminName} ${admin.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === "active") return "bg-green-100 text-green-700 border-green-200";
    if (["delete", "deleted"].includes(s))
      return "bg-red-100 text-red-700 border-red-200";
    if (["blocked", "block"].includes(s))
      return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const handleDelete = () => {
    toast.success("Admin deleted successfully");
    setAdmin((prev) => prev.filter((a) => a._id !== selectedAdminId));
    setShowModal(false);
    setSelectedAdminId(null);
  };

  const handleBlock = () => {
    const adminToBlock = admin.find((a) => a._id === selectedAdminId);
    const isCurrentlyBlocked =
      adminToBlock?.status?.toLowerCase() === "blocked" ||
      adminToBlock?.status?.toLowerCase() === "block";

    if (isCurrentlyBlocked) {
      toast.success("Admin unblocked successfully");
      setAdmin((prev) =>
        prev.map((a) =>
          a._id === selectedAdminId ? { ...a, status: "Active" } : a
        )
      );
    } else {
      toast.success("Admin blocked successfully");
      setAdmin((prev) =>
        prev.map((a) =>
          a._id === selectedAdminId ? { ...a, status: "Blocked" } : a
        )
      );
    }

    setShowBlockModal(false);
    setSelectedAdminId(null);
  };

  const handleEdit = (admin) => {
    setEditAdminData(admin);
    setFormData({
      adminName: admin.adminName,
      email: admin.email,
      role: admin.role,
      status: admin.status,
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.adminName.trim()) {
      errors.adminName = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.status) {
      errors.status = "Status is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveEdit = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setAdmin((prev) =>
      prev.map((a) => (a._id === editAdminData._id ? { ...a, ...formData } : a))
    );
    toast.success("Admin updated successfully");
    setShowEditModal(false);
    setEditAdminData(null);
    setFormData({
      adminName: "",
      email: "",
      role: "",
      status: "",
    });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditAdminData(null);
    setFormData({
      adminName: "",
      email: "",
      role: "",
      status: "",
    });
    setFormErrors({});
  };

  return (
    <div className="relative rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50 sm:p-6">
      {/* Header - Removed the badge */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Admin Management
        </h2>
      </div>

      {/* Table Container - Desktop */}
      <div className="hidden overflow-hidden rounded-lg border border-blue-100 md:block">
        <div className="max-h-[500px] overflow-x-auto overflow-y-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-blue-600 text-sm text-white shadow-md">
              <tr>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  #
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Name
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Email
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Role
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Status
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filteredAdmin.length ? (
                filteredAdmin.map((admin, idx) => (
                  <tr
                    key={admin._id}
                    className="transition-all duration-200 hover:bg-blue-50/50"
                  >
                    <td className="px-4 py-4 font-medium text-gray-700">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-800">
                      {admin.adminName}
                    </td>
                    <td className="break-all px-4 py-4 text-gray-600">
                      {admin.email}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${getStatusClass(
                          admin.status
                        )}`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(admin)}
                          className="rounded-lg bg-blue-100 p-2.5 text-blue-600 transition-all duration-200 hover:bg-blue-200 hover:shadow-md"
                          title="Edit"
                        >
                          <FaEdit className="text-base" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAdminId(admin._id);
                            setShowModal(true);
                          }}
                          className="rounded-lg bg-red-100 p-2.5 text-red-600 transition-all duration-200 hover:bg-red-200 hover:shadow-md"
                          title="Delete"
                        >
                          <FaTrash className="text-base" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAdminId(admin._id);
                            setShowBlockModal(true);
                          }}
                          className={`rounded-lg p-2.5 transition-all duration-200 hover:shadow-md ${
                            admin.status?.toLowerCase() === "blocked" ||
                            admin.status?.toLowerCase() === "block"
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                          }`}
                          title={
                            admin.status?.toLowerCase() === "blocked" ||
                            admin.status?.toLowerCase() === "block"
                              ? "Unblock"
                              : "Block"
                          }
                        >
                          <FaBan className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="text-5xl text-blue-200">📋</div>
                      <p className="text-base font-medium">No admin found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card View - Mobile */}
      <div className="space-y-4 md:hidden">
        {filteredAdmin.length ? (
          filteredAdmin.map((admin, idx) => (
            <div
              key={admin._id}
              className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {idx + 1}
                    </span>
                    <h3 className="font-semibold text-gray-800">
                      {admin.adminName}
                    </h3>
                  </div>
                  <p className="break-all text-xs text-gray-600">
                    {admin.email}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="mb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Role:
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {admin.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Status:
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                      admin.status
                    )}`}
                  >
                    {admin.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2 border-t border-blue-100 pt-3">
                <button
                  onClick={() => handleEdit(admin)}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-blue-600 transition-all duration-200 hover:bg-blue-200"
                >
                  <FaEdit className="text-sm" />
                  <span className="text-xs font-medium">Edit</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedAdminId(admin._id);
                    setShowModal(true);
                  }}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-red-600 transition-all duration-200 hover:bg-red-200"
                >
                  <FaTrash className="text-sm" />
                  <span className="text-xs font-medium">Delete</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedAdminId(admin._id);
                    setShowBlockModal(true);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-all duration-200 ${
                    admin.status?.toLowerCase() === "blocked" ||
                    admin.status?.toLowerCase() === "block"
                      ? "bg-green-100 text-green-600 hover:bg-green-200"
                      : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                  }`}
                >
                  <FaBan className="text-sm" />
                  <span className="text-xs font-medium">
                    {admin.status?.toLowerCase() === "blocked" ||
                    admin.status?.toLowerCase() === "block"
                      ? "Unblock"
                      : "Block"}
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
            <div className="text-5xl text-blue-200">📋</div>
            <p className="text-base font-medium">No admin found</p>
            <p className="text-sm text-gray-400">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {showModal && (
        <ConfirmationModal
          title="Delete Admin"
          message="Are you sure you want to delete this admin? This action cannot be undone."
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
          confirmLabel="Delete"
          confirmClass="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          icon={<FaTrash className="text-xl text-red-500 sm:text-2xl" />}
        />
      )}

      {/* Block/Unblock Confirmation */}
      {showBlockModal &&
        (() => {
          const adminToBlock = admin.find((a) => a._id === selectedAdminId);
          const isCurrentlyBlocked =
            adminToBlock?.status?.toLowerCase() === "blocked" ||
            adminToBlock?.status?.toLowerCase() === "block";

          return (
            <ConfirmationModal
              title={isCurrentlyBlocked ? "Unblock Admin" : "Block Admin"}
              message={
                isCurrentlyBlocked
                  ? "Are you sure you want to unblock this admin? They will regain access to the system."
                  : "Are you sure you want to block this admin? They will lose access to the system."
              }
              onCancel={() => setShowBlockModal(false)}
              onConfirm={handleBlock}
              confirmLabel={isCurrentlyBlocked ? "Unblock" : "Block"}
              confirmClass={
                isCurrentlyBlocked
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              }
              icon={
                <FaBan
                  className={`text-xl sm:text-2xl ${
                    isCurrentlyBlocked ? "text-green-500" : "text-orange-500"
                  }`}
                />
              }
            />
          );
        })()}

      {/* Edit Modal */}
      {showEditModal && editAdminData && (
        <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 border-b border-blue-100 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 sm:px-8 sm:py-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  Edit Admin Details
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="rounded-lg p-1.5 text-white transition-colors hover:bg-white/20"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-6 sm:p-8">
              {/* Name Field */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Admin Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border-2 ${
                    formErrors.adminName
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                  } px-4 py-3 text-sm transition-all focus:outline-none focus:ring-4`}
                  placeholder="Enter admin name"
                />
                {formErrors.adminName && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <FaTimes className="text-xs" />
                    {formErrors.adminName}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border-2 ${
                    formErrors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                  } px-4 py-3 text-sm transition-all focus:outline-none focus:ring-4`}
                  placeholder="admin@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <FaTimes className="text-xs" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Role Field */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-2 border-blue-100 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  placeholder="e.g., sub admin"
                />
              </div>

              {/* Status Field */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border-2 ${
                    formErrors.status
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                  } px-4 py-3 text-sm transition-all focus:outline-none focus:ring-4`}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Deleted">Deleted</option>
                </select>
                {formErrors.status && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <FaTimes className="text-xs" />
                    {formErrors.status}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-blue-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
              <button
                onClick={handleCancelEdit}
                className="w-full rounded-lg border-2 border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-xl sm:w-auto"
              >
                <FaCheck />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Confirmation Modal
const ConfirmationModal = ({
  title,
  message,
  onCancel,
  onConfirm,
  confirmLabel,
  confirmClass,
  icon,
}) => (
  <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
      {/* Modal Header */}
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="rounded-full bg-gray-100 p-2 sm:p-3">{icon}</div>
          <h2 className="text-base font-bold text-gray-800 sm:text-lg">
            {title}
          </h2>
        </div>
      </div>

      {/* Modal Body */}
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <p className="text-sm leading-relaxed text-gray-600">{message}</p>
      </div>

      {/* Modal Footer */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:justify-end sm:px-6 sm:py-4">
        <button
          onClick={onCancel}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto sm:px-5 sm:py-2.5"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl sm:w-auto sm:px-5 sm:py-2.5 ${confirmClass}`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default AdminTable;
