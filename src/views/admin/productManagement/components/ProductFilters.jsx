import React from "react";
import { FaFilter, FaRedo } from "react-icons/fa";

const ProductFilters = ({ filters, onFilterChange, onResetFilters }) => {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Kids", label: "Kids" },
    { value: "Accessories", label: "Accessories" },
    { value: "Shoes", label: "Shoes" },
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "in-stock", label: "In Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
    { value: "low-stock", label: "Low Stock" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-1000", label: "Under ₹1,000" },
    { value: "1000-3000", label: "₹1,000 - ₹3,000" },
    { value: "3000-5000", label: "₹3,000 - ₹5,000" },
    { value: "5000+", label: "Above ₹5,000" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {/* Category Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

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

        {/* Price Range Filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => onFilterChange("priceRange", e.target.value)}
            className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
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

export default ProductFilters;
