import React from "react";
import {
  FaBox,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBan,
  FaDollarSign,
} from "react-icons/fa";

const ProductStats = ({ stats, isLoading }) => {
  const statsData = [
    {
      title: "Total Products",
      value: stats.total,
      icon: <FaBox className="text-xl sm:text-2xl" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Active Products",
      value: stats.active,
      icon: <FaCheckCircle className="text-xl sm:text-2xl" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: <FaBan className="text-xl sm:text-2xl" />,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: <FaExclamationTriangle className="text-xl sm:text-2xl" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      title: "Total Value",
      value: `₹${stats.totalValue.toLocaleString("en-IN")}`,
      icon: <FaDollarSign className="text-xl sm:text-2xl" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="h-24 animate-pulse rounded-xl bg-gray-200 sm:h-28"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
      {statsData.map((stat, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 sm:p-5"
        >
          {/* Background Gradient */}
          <div
            className={`absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-br ${stat.color} opacity-10 transition-all duration-300 group-hover:h-24 group-hover:w-24 group-hover:opacity-20`}
          ></div>

          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-1 text-xs font-medium text-gray-600 sm:text-sm">
                {stat.title}
              </p>
              <p className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                {stat.value}
              </p>
            </div>
            <div
              className={`${stat.bgColor} ${stat.textColor} rounded-lg p-2.5 transition-transform duration-300 group-hover:scale-110 sm:p-3`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;
