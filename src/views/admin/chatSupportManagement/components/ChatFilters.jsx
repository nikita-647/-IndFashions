import React from "react";
import { FaFilter, FaRedo } from "react-icons/fa";

const ChatFilters = ({ filters, onFilterChange, onResetFilters }) => {
  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "resolved", label: "Resolved" },
  ];

  const priorities = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "unread", label: "Unread First" },
    { value: "priority", label: "Priority" },
  ];

  return (
    <div className="rounded-xl border border-blue-100 bg-white p-3 shadow-lg shadow-blue-100/50 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFilter className="text-blue-600" />
          <h3 className="text-base font-bold text-gray-800 sm:text-lg">
            Filters
          </h3>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all hover:bg-gray-200 sm:px-4 sm:py-2 sm:text-sm"
        >
          <FaRedo className="text-xs" />
          <span>Reset</span>
        </button>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {/* Status Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange("priority", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ChatFilters;
