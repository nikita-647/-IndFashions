import { useState } from "react";
import {
  FaSearch,
  FaUserCheck,
  FaBan,
  FaUsers,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import UserTable from "./components/UserTable";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    blocked: 0,
    inactive: 0,
    totalWishlist: 0,
    totalCart: 0,
    totalOrders: 0,
  });

  // Function to update stats - will be passed to UserTable
  const updateStats = (users) => {
    const stats = {
      total: users.length,
      active: users.filter((user) => user.status?.toLowerCase() === "active")
        .length,
      blocked: users.filter(
        (user) =>
          user.status?.toLowerCase() === "blocked" ||
          user.status?.toLowerCase() === "block"
      ).length,
      inactive: users.filter(
        (user) => user.status?.toLowerCase() === "inactive"
      ).length,
      totalWishlist: users.reduce(
        (sum, user) => sum + (user.wishlistCount || 0),
        0
      ),
      totalCart: users.reduce((sum, user) => sum + (user.cartCount || 0), 0),
      totalOrders: users.reduce(
        (sum, user) => sum + (user.totalOrders || 0),
        0
      ),
    };
    setUserStats(stats);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      {/* Header Container */}
      <div className="mb-6 sm:mb-8">
        {/* Title and Actions */}
        <div className="mb-4 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Page Title */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              User Management
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Manage customer accounts and activity
            </p>
          </div>

          {/* Actions Container */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Box */}
            <div className="relative w-full sm:w-64 lg:w-72">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border-2 border-blue-100 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Users */}
          <div className="group rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaUsers className="text-xl text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {userStats.total}
                </p>
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="group rounded-xl border border-green-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-green-100 to-green-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaUserCheck className="text-xl text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Active
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {userStats.active}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{
                  width: `${
                    userStats.total > 0
                      ? (userStats.active / userStats.total) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Blocked Users */}
          <div className="group rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaBan className="text-xl text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Blocked
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {userStats.blocked}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{
                  width: `${
                    userStats.total > 0
                      ? (userStats.blocked / userStats.total) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Inactive Users */}
          <div className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaUsers className="text-xl text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Inactive
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {userStats.inactive}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-gray-400 to-gray-500 transition-all duration-500"
                style={{
                  width: `${
                    userStats.total > 0
                      ? (userStats.inactive / userStats.total) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Activity Stats Cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Wishlist Items */}
          <div className="group rounded-xl border border-pink-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-pink-100 to-pink-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaHeart className="text-xl text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Total Wishlist
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {userStats.totalWishlist}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Items saved by all users
            </p>
          </div>

          {/* Total Cart Items */}
          <div className="group rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaShoppingCart className="text-xl text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Total Cart
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {userStats.totalCart}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">Items in active carts</p>
          </div>

          {/* Total Orders */}
          <div className="group rounded-xl border border-purple-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 p-3 transition-all duration-200 group-hover:scale-110">
                <div className="text-xl text-purple-600">📦</div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {userStats.totalOrders}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">Completed purchases</p>
          </div>
        </div>
      </div>

      {/* User Table */}
      <UserTable searchTerm={searchTerm} updateStats={updateStats} />
    </div>
  );
};

export default UserManagement;
