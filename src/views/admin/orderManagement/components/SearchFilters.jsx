// OrderManagement/components/SearchFilters.jsx
import React from "react";
import { Search, Filter, Download } from "lucide-react";

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  showFilters,
  setShowFilters,
}) => {
  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="mb-6 rounded-2xl border-2 border-blue-100 bg-white p-5 shadow-lg shadow-blue-100/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/50 py-3 pl-12 pr-4 text-sm font-medium text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-all duration-200 ${
              showFilters
                ? "border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                : "border-blue-200 bg-white text-blue-600 hover:border-blue-500 hover:bg-blue-50"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          <button className="border-emerald-200 text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 flex items-center gap-2 rounded-xl border-2 bg-white px-5 py-3 text-sm font-semibold transition-all duration-200">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      {showFilters && (
        <div className="mt-5 flex flex-wrap gap-2 border-t-2 border-blue-100 pt-5">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                statusFilter === option.value
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
