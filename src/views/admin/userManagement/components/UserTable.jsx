import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaBan,
  FaTimes,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import toast from "react-hot-toast";
import EditUserForm from "./EditUserForm";
import WishlistModal from "./WishListModal";
import CartModal from "./CartModal";
import OrdersModal from "./OrdersModal";

const UserTable = ({ searchTerm = "", updateStats }) => {
  const [users, setUsers] = useState([
    {
      _id: "1",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      address: "Mumbai, Maharashtra",
      status: "Active",
      wishlistCount: 12,
      cartCount: 3,
      totalOrders: 8,
      joinedDate: "2024-01-15",
    },
    {
      _id: "2",
      name: "Rahul Kumar",
      email: "rahul.k@example.com",
      phone: "+91 87654 32109",
      address: "Delhi, Delhi",
      status: "Active",
      wishlistCount: 5,
      cartCount: 1,
      totalOrders: 15,
      joinedDate: "2023-11-20",
    },
    {
      _id: "3",
      name: "Ananya Gupta",
      email: "ananya.g@example.com",
      phone: "+91 76543 21098",
      address: "Bangalore, Karnataka",
      status: "Blocked",
      wishlistCount: 8,
      cartCount: 0,
      totalOrders: 4,
      joinedDate: "2024-02-10",
    },
    {
      _id: "4",
      name: "Vikram Singh",
      email: "vikram.s@example.com",
      phone: "+91 65432 10987",
      address: "Jaipur, Rajasthan",
      status: "Active",
      wishlistCount: 20,
      cartCount: 5,
      totalOrders: 22,
      joinedDate: "2023-09-05",
    },
    {
      _id: "5",
      name: "Neha Patel",
      email: "neha.patel@example.com",
      phone: "+91 54321 09876",
      address: "Ahmedabad, Gujarat",
      status: "Inactive",
      wishlistCount: 2,
      cartCount: 0,
      totalOrders: 1,
      joinedDate: "2024-03-25",
    },
  ]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (updateStats) {
      updateStats(users);
    }
  }, [users, updateStats]);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === "active") return "bg-green-100 text-green-700 border-green-200";
    if (s === "inactive") return "bg-gray-100 text-gray-700 border-gray-200";
    if (["blocked", "block"].includes(s))
      return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const handleDelete = () => {
    toast.success("User deleted successfully");
    setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleBlock = () => {
    const userToBlock = users.find((u) => u._id === selectedUserId);
    const isCurrentlyBlocked =
      userToBlock?.status?.toLowerCase() === "blocked" ||
      userToBlock?.status?.toLowerCase() === "block";

    if (isCurrentlyBlocked) {
      toast.success("User unblocked successfully");
      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUserId ? { ...u, status: "Active" } : u
        )
      );
    } else {
      toast.success("User blocked successfully");
      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUserId ? { ...u, status: "Blocked" } : u
        )
      );
    }

    setShowBlockModal(false);
    setSelectedUserId(null);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleViewWishlist = (user) => {
    setSelectedUser(user);
    setShowWishlistModal(true);
  };

  const handleViewCart = (user) => {
    setSelectedUser(user);
    setShowCartModal(true);
  };

  const handleViewOrders = (user) => {
    setSelectedUser(user);
    setShowOrdersModal(true);
  };

  const handleUpdateUser = (updatedUserData) => {
    setUsers((prev) =>
      prev.map((u) =>
        u._id === selectedUser._id ? { ...u, ...updatedUserData } : u
      )
    );
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="relative rounded-xl border border-blue-100 bg-white p-3 shadow-lg shadow-blue-100/50 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-5 lg:mb-6">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
          User Management
        </h2>
        <p className="mt-1 text-xs text-gray-600 sm:text-sm">
          Manage customer accounts and activity
        </p>
      </div>

      {/* Desktop Table View - Hidden below xl */}
      <div className="hidden overflow-hidden rounded-lg border border-blue-100 xl:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-sm text-white">
              <tr>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  S.No.
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Name
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Email
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Phone
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Status
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 text-center font-semibold xl:px-4 xl:py-4">
                  Wishlist
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 text-center font-semibold xl:px-4 xl:py-4">
                  Cart
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 text-center font-semibold xl:px-4 xl:py-4">
                  Orders
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filteredUsers.length ? (
                filteredUsers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className="transition-all duration-200 hover:bg-blue-50/50"
                  >
                    <td className="px-3 py-3 font-medium text-gray-700 xl:px-4 xl:py-4">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-3 xl:px-4 xl:py-4">
                      <div className="font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Joined{" "}
                        {new Date(user.joinedDate).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="max-w-[180px] truncate px-3 py-3 text-sm text-gray-600 xl:max-w-[200px] xl:px-4 xl:py-4">
                      {user.email}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600 xl:px-4 xl:py-4">
                      {user.phone}
                    </td>
                    <td className="px-3 py-3 xl:px-4 xl:py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium xl:px-3 ${getStatusClass(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center xl:px-4 xl:py-4">
                      <button
                        onClick={() => handleViewWishlist(user)}
                        className="group inline-flex items-center justify-center gap-1 transition-all hover:scale-110"
                        title="View Wishlist"
                      >
                        <FaHeart className="text-sm text-pink-500" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600">
                          {user.wishlistCount}
                        </span>
                        <FaEye className="text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center xl:px-4 xl:py-4">
                      <button
                        onClick={() => handleViewCart(user)}
                        className="group inline-flex items-center justify-center gap-1 transition-all hover:scale-110"
                        title="View Cart"
                      >
                        <FaShoppingCart className="text-sm text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                          {user.cartCount}
                        </span>
                        <FaEye className="text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center xl:px-4 xl:py-4">
                      <button
                        onClick={() => handleViewOrders(user)}
                        className="group inline-flex items-center justify-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 transition-all hover:scale-105 hover:bg-purple-200 xl:px-3"
                        title="View Orders"
                      >
                        <span className="text-xs font-semibold text-purple-700">
                          {user.totalOrders}
                        </span>
                        <FaEye className="text-xs text-purple-500" />
                      </button>
                    </td>
                    <td className="px-3 py-3 xl:px-4 xl:py-4">
                      <div className="flex flex-wrap gap-1.5 xl:gap-2">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-all duration-200 hover:bg-blue-200 hover:shadow-md xl:p-2.5"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="rounded-lg bg-indigo-100 p-2 text-indigo-600 transition-all duration-200 hover:bg-indigo-200 hover:shadow-md xl:p-2.5"
                          title="Edit User"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setShowModal(true);
                          }}
                          className="rounded-lg bg-red-100 p-2 text-red-600 transition-all duration-200 hover:bg-red-200 hover:shadow-md xl:p-2.5"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setShowBlockModal(true);
                          }}
                          className={`rounded-lg p-2 transition-all duration-200 hover:shadow-md xl:p-2.5 ${
                            user.status?.toLowerCase() === "blocked" ||
                            user.status?.toLowerCase() === "block"
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                          }`}
                          title={
                            user.status?.toLowerCase() === "blocked" ||
                            user.status?.toLowerCase() === "block"
                              ? "Unblock"
                              : "Block"
                          }
                        >
                          <FaBan className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="text-5xl text-blue-200">👥</div>
                      <p className="text-base font-medium">No users found</p>
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

      {/* Card View - Mobile/Tablet (below xl) */}
      <div className="space-y-3 sm:space-y-4 xl:hidden">
        {filteredUsers.length ? (
          filteredUsers.map((user, idx) => (
            <div
              key={user._id}
              className="rounded-xl border border-blue-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md sm:p-4"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 sm:h-6 sm:w-6">
                      {idx + 1}
                    </span>
                    <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                      {user.name}
                    </h3>
                  </div>
                  <p className="truncate text-xs text-gray-600">{user.email}</p>
                  <p className="mt-1 text-xs text-gray-500">{user.phone}</p>
                </div>
              </div>

              {/* Stats Grid - Clickable */}
              <div className="mb-3 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleViewWishlist(user)}
                  className="rounded-lg bg-pink-50 p-2 text-center transition-all hover:scale-105 hover:bg-pink-100 active:scale-95"
                >
                  <FaHeart className="mx-auto mb-1 text-base text-pink-500 sm:text-lg" />
                  <div className="text-xs font-medium text-gray-600">
                    Wishlist
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1">
                    <span className="text-sm font-bold text-gray-800">
                      {user.wishlistCount}
                    </span>
                    <FaEye className="text-xs text-pink-500" />
                  </div>
                </button>
                <button
                  onClick={() => handleViewCart(user)}
                  className="rounded-lg bg-blue-50 p-2 text-center transition-all hover:scale-105 hover:bg-blue-100 active:scale-95"
                >
                  <FaShoppingCart className="mx-auto mb-1 text-base text-blue-500 sm:text-lg" />
                  <div className="text-xs font-medium text-gray-600">Cart</div>
                  <div className="mt-1 flex items-center justify-center gap-1">
                    <span className="text-sm font-bold text-gray-800">
                      {user.cartCount}
                    </span>
                    <FaEye className="text-xs text-blue-500" />
                  </div>
                </button>
                <button
                  onClick={() => handleViewOrders(user)}
                  className="rounded-lg bg-purple-50 p-2 text-center transition-all hover:scale-105 hover:bg-purple-100 active:scale-95"
                >
                  <div className="mx-auto mb-1 text-base sm:text-lg">📦</div>
                  <div className="text-xs font-medium text-gray-600">
                    Orders
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1">
                    <span className="text-sm font-bold text-gray-800">
                      {user.totalOrders}
                    </span>
                    <FaEye className="text-xs text-purple-500" />
                  </div>
                </button>
              </div>

              {/* Info */}
              <div className="mb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Status:
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium sm:px-3 sm:py-1 ${getStatusClass(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Joined:
                  </span>
                  <span className="text-xs text-gray-700">
                    {new Date(user.joinedDate).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-4 gap-2 border-t border-blue-100 pt-3">
                <button
                  onClick={() => handleViewDetails(user)}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg bg-blue-100 px-2 py-2 text-blue-600 transition-all duration-200 hover:bg-blue-200 active:scale-95"
                >
                  <FaEye className="text-xs sm:text-sm" />
                  <span className="text-xs font-medium">View</span>
                </button>
                <button
                  onClick={() => handleEdit(user)}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg bg-indigo-100 px-2 py-2 text-indigo-600 transition-all duration-200 hover:bg-indigo-200 active:scale-95"
                >
                  <FaEdit className="text-xs sm:text-sm" />
                  <span className="text-xs font-medium">Edit</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedUserId(user._id);
                    setShowModal(true);
                  }}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg bg-red-100 px-2 py-2 text-red-600 transition-all duration-200 hover:bg-red-200 active:scale-95"
                >
                  <FaTrash className="text-xs sm:text-sm" />
                  <span className="text-xs font-medium">Delete</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedUserId(user._id);
                    setShowBlockModal(true);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 transition-all duration-200 active:scale-95 ${
                    user.status?.toLowerCase() === "blocked" ||
                    user.status?.toLowerCase() === "block"
                      ? "bg-green-100 text-green-600 hover:bg-green-200"
                      : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                  }`}
                >
                  <FaBan className="text-xs sm:text-sm" />
                  <span className="text-xs font-medium">
                    {user.status?.toLowerCase() === "blocked" ||
                    user.status?.toLowerCase() === "block"
                      ? "Unblock"
                      : "Block"}
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
            <div className="text-4xl text-blue-200 sm:text-5xl">👥</div>
            <p className="text-sm font-medium sm:text-base">No users found</p>
            <p className="text-xs text-gray-400 sm:text-sm">
              Try adjusting your search
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone and will remove all user data."
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
          confirmLabel="Delete"
          confirmClass="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          icon={
            <FaTrash className="text-lg text-red-500 sm:text-xl lg:text-2xl" />
          }
        />
      )}

      {/* Block/Unblock Confirmation Modal */}
      {showBlockModal &&
        (() => {
          const userToBlock = users.find((u) => u._id === selectedUserId);
          const isCurrentlyBlocked =
            userToBlock?.status?.toLowerCase() === "blocked" ||
            userToBlock?.status?.toLowerCase() === "block";

          return (
            <ConfirmationModal
              title={isCurrentlyBlocked ? "Unblock User" : "Block User"}
              message={
                isCurrentlyBlocked
                  ? "Are you sure you want to unblock this user? They will regain access to their account."
                  : "Are you sure you want to block this user? They will lose access to their account."
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
                  className={`text-lg sm:text-xl lg:text-2xl ${
                    isCurrentlyBlocked ? "text-green-500" : "text-orange-500"
                  }`}
                />
              }
            />
          );
        })()}

      {/* View Details Modal */}
      {showViewModal && selectedUser && (
        <ViewDetailsModal
          user={selectedUser}
          onClose={() => setShowViewModal(false)}
          getStatusClass={getStatusClass}
        />
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <EditUserForm
          userData={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onUpdate={handleUpdateUser}
        />
      )}

      {/* Wishlist Modal */}
      {showWishlistModal && selectedUser && (
        <WishlistModal
          user={selectedUser}
          onClose={() => {
            setShowWishlistModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {/* Cart Modal */}
      {showCartModal && selectedUser && (
        <CartModal
          user={selectedUser}
          onClose={() => {
            setShowCartModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {/* Orders Modal */}
      {showOrdersModal && selectedUser && (
        <OrdersModal
          user={selectedUser}
          onClose={() => {
            setShowOrdersModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

// Confirmation Modal Component
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
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="rounded-full bg-gray-100 p-2 sm:p-3">{icon}</div>
          <h2 className="text-base font-bold text-gray-800 sm:text-lg">
            {title}
          </h2>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <p className="text-sm leading-relaxed text-gray-600">{message}</p>
      </div>
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

// View Details Modal Component
const ViewDetailsModal = ({ user, onClose, getStatusClass }) => (
  <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
      {/* Modal Header */}
      <div className="sticky top-0 z-10 border-b border-blue-100 bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white transition-all hover:rotate-90 hover:bg-white/20"
          >
            <FaTimes className="text-base sm:text-lg" />
          </button>
        </div>
      </div>

      {/* Modal Body */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Personal Info */}
        <div className="mb-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800 sm:text-lg">
            <div className="rounded-lg bg-blue-100 p-2">
              <FaEye className="text-blue-600" />
            </div>
            Personal Information
          </h3>
          <div className="space-y-3 rounded-lg border border-blue-100 bg-blue-50/30 p-3 sm:p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <span className="text-sm font-medium text-gray-600">Name:</span>
              <span className="text-sm font-semibold text-gray-800 sm:text-right">
                {user.name}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <span className="text-sm font-medium text-gray-600">Email:</span>
              <span className="truncate text-sm text-gray-800 sm:text-right">
                {user.email}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <span className="text-sm font-medium text-gray-600">Phone:</span>
              <span className="text-sm text-gray-800 sm:text-right">
                {user.phone}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <span className="text-sm font-medium text-gray-600">
                Address:
              </span>
              <span className="text-sm text-gray-800 sm:text-right">
                {user.address}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <span
                className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                  user.status
                )}`}
              >
                {user.status}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <span className="text-sm font-medium text-gray-600">
                Joined Date:
              </span>
              <span className="text-sm text-gray-800 sm:text-right">
                {new Date(user.joinedDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800 sm:text-lg">
            <div className="rounded-lg bg-purple-100 p-2">
              <FaShoppingCart className="text-purple-600" />
            </div>
            Activity Stats
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-lg border border-pink-200 bg-pink-50 p-3 text-center sm:p-4">
              <FaHeart className="mx-auto mb-2 text-xl text-pink-500 sm:text-2xl" />
              <div className="text-xs font-medium text-gray-600 sm:text-sm">
                Wishlist Items
              </div>
              <div className="mt-1 text-xl font-bold text-gray-800 sm:text-2xl">
                {user.wishlistCount}
              </div>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center sm:p-4">
              <FaShoppingCart className="mx-auto mb-2 text-xl text-blue-500 sm:text-2xl" />
              <div className="text-xs font-medium text-gray-600 sm:text-sm">
                Cart Items
              </div>
              <div className="mt-1 text-xl font-bold text-gray-800 sm:text-2xl">
                {user.cartCount}
              </div>
            </div>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-center sm:p-4">
              <div className="mx-auto mb-2 text-xl sm:text-2xl">📦</div>
              <div className="text-xs font-medium text-gray-600 sm:text-sm">
                Total Orders
              </div>
              <div className="mt-1 text-xl font-bold text-gray-800 sm:text-2xl">
                {user.totalOrders}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="border-t border-blue-100 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-xl sm:w-auto"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default UserTable;
