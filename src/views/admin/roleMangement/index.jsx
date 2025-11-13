import { useState } from "react";
import {
  FaSearch,
  FaUserPlus,
  FaUserCheck,
  FaBan,
  FaUserTimes,
} from "react-icons/fa";
import AdminTable from "./components/RoleTable";
import AddSubAdminForm from "./components/AddSubAdminForm";

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [adminStats, setAdminStats] = useState({
    total: 0,
    active: 0,
    blocked: 0,
    deleted: 0,
  });

  // Function to update stats - will be passed to AdminTable
  const updateStats = (admins) => {
    const stats = {
      total: admins.length,
      active: admins.filter((admin) => admin.status?.toLowerCase() === "active")
        .length,
      blocked: admins.filter(
        (admin) =>
          admin.status?.toLowerCase() === "blocked" ||
          admin.status?.toLowerCase() === "block"
      ).length,
      deleted: admins.filter(
        (admin) =>
          admin.status?.toLowerCase() === "deleted" ||
          admin.status?.toLowerCase() === "delete"
      ).length,
    };
    setAdminStats(stats);
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
              Role Management
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Manage sub-admin roles and permissions
            </p>
          </div>

          {/* Actions Container */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Box */}
            <div className="relative w-full sm:w-64 lg:w-72">
              <input
                type="text"
                placeholder="Search sub admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border-2 border-blue-100 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400" />
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/40 sm:w-auto"
            >
              <FaUserPlus className="text-base" />
              <span className="whitespace-nowrap">Add Sub Admin</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Admins */}
          <div className="group rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaUserPlus className="text-xl text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Total Admins
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {adminStats.total}
                </p>
              </div>
            </div>
          </div>

          {/* Active Admins */}
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
                  {adminStats.active}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{
                  width: `${
                    adminStats.total > 0
                      ? (adminStats.active / adminStats.total) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Blocked Admins */}
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
                  {adminStats.blocked}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{
                  width: `${
                    adminStats.total > 0
                      ? (adminStats.blocked / adminStats.total) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Deleted Admins */}
          <div className="group rounded-xl border border-red-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-red-100 to-red-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaUserTimes className="text-xl text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Deleted
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {adminStats.deleted}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                style={{
                  width: `${
                    adminStats.total > 0
                      ? (adminStats.deleted / adminStats.total) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <AdminTable searchTerm={searchTerm} updateStats={updateStats} />

      {/* Add Modal */}
      {showAddModal && (
        <AddSubAdminForm onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default RoleManagement;
