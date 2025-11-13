import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import {
  FaUserEdit,
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const PERMISSIONS = {
  Projects: [
    { key: "project.add", label: "Add Project" },
    { key: "project.edit", label: "Edit Project" },
    { key: "project.delete", label: "Delete Project" },
    { key: "project.upload", label: "Upload Projects" },
  ],
  Customers: [
    { key: "customer.add", label: "Add Customer" },
    { key: "customer.edit", label: "Edit Customer" },
    { key: "customer.delete", label: "Delete Customer" },
    { key: "customer.upload", label: "Upload Customers" },
  ],
  Visits: [
    { key: "visit.add", label: "Add Visit" },
    { key: "visit.edit", label: "Edit Visit" },
  ],
  Bills: [
    { key: "bill.add", label: "Add Bill" },
    { key: "bill.edit", label: "Edit Bill" },
    { key: "bill.delete", label: "Delete Bill" },
  ],
  FinalBills: [{ key: "finalBill.add", label: "Add Final Bill" }],
};

const EditSubAdminForm = ({ onClose, subAdminData }) => {
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Active");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Convert database permissions format to form format
  const convertDbPermissionsToForm = (dbPermissions) => {
    const formPermissions = [];

    // Get all possible permission keys from PERMISSIONS object
    const allPermissionKeys = Object.values(PERMISSIONS).flat();

    allPermissionKeys.forEach((perm) => {
      const [module, action] = perm.key.split(".");
      const value = dbPermissions?.[module]?.[action] || false;
      formPermissions.push({ key: perm.key, value });
    });

    return formPermissions;
  };

  // Convert form permissions format to database format
  const convertFormPermissionsToDb = (formPermissions) => {
    const dbPermissions = {
      project: { add: false, edit: false, delete: false, upload: false },
      customer: { add: false, edit: false, delete: false, upload: false },
      visit: { add: false, edit: false },
      bill: { add: false, edit: false, delete: false },
      finalBill: { add: false },
    };

    formPermissions.forEach((perm) => {
      const [module, action] = perm.key.split(".");
      if (
        dbPermissions[module] &&
        dbPermissions[module][action] !== undefined
      ) {
        dbPermissions[module][action] = perm.value;
      }
    });

    return dbPermissions;
  };

  // Load sub-admin data on mount
  useEffect(() => {
    if (subAdminData) {
      setAdminName(subAdminData.adminName || "");
      setEmail(subAdminData.email || "");
      setStatus(subAdminData.status || "Active");

      // Convert database permissions to form format
      const formPermissions = convertDbPermissionsToForm(
        subAdminData.permissions
      );
      setSelectedPermissions(formPermissions);
      setIsLoading(false);
    }
  }, [subAdminData]);

  // Toggle permission value true/false
  const handlePermissionToggle = (key) => {
    setSelectedPermissions((prev) => {
      return prev.map((p) => (p.key === key ? { ...p, value: !p.value } : p));
    });
  };

  // Check if permission is ticked
  const isChecked = (key) => {
    const perm = selectedPermissions.find((p) => p.key === key);
    return perm ? perm.value : false;
  };

  // Submit updated sub-admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const loadingToast = toast.loading("Updating sub-admin...");

    try {
      // Convert form permissions back to database format
      const dbPermissions = convertFormPermissionsToDb(selectedPermissions);

      const response = await axios.post(
        `https://swaramayi-backend.onrender.com/api/admin/edit-subadmin/${subAdminData._id}`,
        {
          adminName,
          password: password || undefined, // Don't send empty password
          status,
          permissions: dbPermissions,
        },
        { headers: { token } }
      );

      toast.dismiss(loadingToast);

      if (response.data.success) {
        toast.success("Sub-admin updated successfully");
        onClose();
      } else {
        toast.error(response.data.message || "Failed to update sub-admin");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error updating sub-admin");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="w-full max-w-2xl rounded-2xl border border-blue-100 bg-white p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>
            <p className="text-lg font-medium text-gray-700">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm">
      <div className="my-6 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-blue-100 bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-blue-100 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                <FaUserEdit className="text-xl text-white" />
              </div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Edit Sub Admin
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:rotate-90 hover:bg-red-500"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          {/* Basic Info Section */}
          <div className="space-y-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <FaUser className="text-blue-500" />
              Basic Information
            </h3>

            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaUser className="text-sm text-blue-500" />
                Admin Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter admin name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="rounded-lg border-2 border-blue-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                required
              />
            </div>

            {/* Email (readonly) */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaEnvelope className="text-sm text-blue-500" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="cursor-not-allowed rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Email cannot be changed
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaLock className="text-sm text-blue-500" />
                New Password
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border-2 border-blue-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Only enter if you want to change the password
              </p>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaCheckCircle className="text-sm text-blue-500" />
                Account Status
                <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-lg border-2 border-blue-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                required
              >
                <option value="Active">Active</option>
                <option value="Delete">Delete</option>
                <option value="Block">Block</option>
              </select>
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-4 border-t border-blue-100 pt-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <FaShieldAlt className="text-blue-500" />
              Permissions Management
            </h3>

            <div className="space-y-4">
              {Object.entries(PERMISSIONS).map(([module, perms]) => (
                <div
                  key={module}
                  className="rounded-xl border-2 border-blue-100 bg-gradient-to-r from-blue-50/50 to-white p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-md"
                >
                  <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-800">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    {module}
                  </h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {perms.map((perm) => (
                      <label
                        key={perm.key}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-blue-100 bg-white p-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/50"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked(perm.key)}
                          onChange={() => handlePermissionToggle(perm.key)}
                          className="h-5 w-5 cursor-pointer rounded border-2 border-blue-300 text-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {perm.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
              <FaCheckCircle />
              Update Sub Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubAdminForm;
