import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import {
  FaUserEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaShoppingCart,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";

const EditUserForm = ({ onClose, userData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [joinedDate, setJoinedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  // Load user data on mount
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setAddress(userData.address || "");
      setStatus(userData.status || "Active");
      setWishlistCount(userData.wishlistCount || 0);
      setCartCount(userData.cartCount || 0);
      setTotalOrders(userData.totalOrders || 0);
      setJoinedDate(userData.joinedDate || "");
      setIsLoading(false);
    }
  }, [userData]);

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,}$/.test(phone)) {
      errors.phone = "Invalid phone number format";
    }

    if (!status) {
      errors.status = "Status is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit updated user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const loadingToast = toast.loading("Updating user...");

    try {
      setTimeout(() => {
        toast.dismiss(loadingToast);
        toast.success("User updated successfully");
        onClose();
      }, 1000);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error updating user");
      console.error(error);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    // Clear error for this field
    const fieldName = e.target.name;
    if (formErrors[fieldName]) {
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
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
                Edit User Details
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
          {/* Personal Information Section */}
          <div className="space-y-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <FaUser className="text-blue-500" />
              Personal Information
            </h3>

            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaUser className="text-sm text-blue-500" />
                Full Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={name}
                onChange={handleInputChange(setName)}
                className={`rounded-lg border-2 ${
                  formErrors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                } bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4`}
                required
              />
              {formErrors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {formErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaEnvelope className="text-sm text-blue-500" />
                Email Address
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                value={email}
                onChange={handleInputChange(setEmail)}
                className={`rounded-lg border-2 ${
                  formErrors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                } bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4`}
                required
              />
              {formErrors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaPhone className="text-sm text-blue-500" />
                Phone Number
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={handleInputChange(setPhone)}
                className={`rounded-lg border-2 ${
                  formErrors.phone
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                } bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4`}
                required
              />
              {formErrors.phone && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {formErrors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt className="text-sm text-blue-500" />
                Address
              </label>
              <textarea
                name="address"
                placeholder="Enter address"
                value={address}
                onChange={handleInputChange(setAddress)}
                rows="3"
                className="rounded-lg border-2 border-blue-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaCheckCircle className="text-sm text-blue-500" />
                Account Status
                <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={status}
                onChange={handleInputChange(setStatus)}
                className={`rounded-lg border-2 ${
                  formErrors.status
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                } bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 focus:ring-4`}
                required
              >
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
                <option value="Inactive">Inactive</option>
              </select>
              {formErrors.status && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {formErrors.status}
                </p>
              )}
            </div>
          </div>

          {/* Activity Information Section (Read-only) */}
          <div className="space-y-4 border-t border-blue-100 pt-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <FaShoppingCart className="text-blue-500" />
              Activity Information
              <span className="text-xs font-normal text-gray-500">
                (Read Only)
              </span>
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Wishlist Count */}
              <div className="rounded-lg border-2 border-pink-200 bg-pink-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FaHeart className="text-pink-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Wishlist Items
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {wishlistCount}
                </div>
              </div>

              {/* Cart Count */}
              <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FaShoppingCart className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Cart Items
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {cartCount}
                </div>
              </div>

              {/* Total Orders */}
              <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-purple-500">📦</span>
                  <span className="text-sm font-medium text-gray-700">
                    Total Orders
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {totalOrders}
                </div>
              </div>

              {/* Joined Date */}
              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Member Since
                  </span>
                </div>
                <div className="text-sm font-bold text-gray-800">
                  {joinedDate
                    ? new Date(joinedDate).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50/30 p-3">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> Activity information (Wishlist, Cart,
                Orders, Join Date) is read-only and managed by the system.
              </p>
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
