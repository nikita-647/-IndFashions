// src/views/admin/reviewManagement/components/ReviewFilters.jsx
import React from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const ReviewFilters = ({ filters, onFilterChange, onResetFilters }) => {
  const hasActiveFilters =
    filters.status !== "all" ||
    filters.rating !== "all" ||
    filters.startDate ||
    filters.endDate;

  return (
    <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFilter className="text-blue-500" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all hover:bg-gray-200"
          >
            <FaTimes className="text-xs" />
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Status Filter */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => onFilterChange("rating", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            From Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange("startDate", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            To Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange("endDate", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;
