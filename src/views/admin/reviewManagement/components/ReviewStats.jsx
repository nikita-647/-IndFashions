// src/views/admin/reviewManagement/components/ReviewStats.jsx
import React from "react";
import {
  FaStar,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaChartLine,
} from "react-icons/fa";

const ReviewStats = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="h-32 animate-pulse rounded-xl bg-gray-200"
          ></div>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Reviews",
      value: stats?.total || 0,
      icon: <FaStar className="text-xl text-blue-600" />,
      bgColor: "from-blue-100 to-blue-200",
      borderColor: "border-blue-100",
      shadowColor: "hover:shadow-blue-100/50",
    },
    {
      title: "Approved",
      value: stats?.approved || 0,
      icon: <FaCheckCircle className="text-xl text-green-600" />,
      bgColor: "from-green-100 to-green-200",
      borderColor: "border-green-100",
      shadowColor: "hover:shadow-green-100/50",
      percentage: stats?.total
        ? ((stats.approved / stats.total) * 100).toFixed(1)
        : 0,
    },
    {
      title: "Pending",
      value: stats?.pending || 0,
      icon: <FaClock className="text-xl text-orange-600" />,
      bgColor: "from-orange-100 to-orange-200",
      borderColor: "border-orange-100",
      shadowColor: "hover:shadow-orange-100/50",
      percentage: stats?.total
        ? ((stats.pending / stats.total) * 100).toFixed(1)
        : 0,
    },
    {
      title: "Rejected",
      value: stats?.rejected || 0,
      icon: <FaBan className="text-xl text-red-600" />,
      bgColor: "from-red-100 to-red-200",
      borderColor: "border-red-100",
      shadowColor: "hover:shadow-red-100/50",
      percentage: stats?.total
        ? ((stats.rejected / stats.total) * 100).toFixed(1)
        : 0,
    },
    {
      title: "Avg Rating",
      value: stats?.averageRating ? stats.averageRating.toFixed(1) : "0.0",
      icon: <FaChartLine className="text-xl text-purple-600" />,
      bgColor: "from-purple-100 to-purple-200",
      borderColor: "border-purple-100",
      shadowColor: "hover:shadow-purple-100/50",
      suffix: "/ 5",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {statsData.map((stat, idx) => (
        <div
          key={idx}
          className={`group rounded-xl border ${stat.borderColor} bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${stat.shadowColor}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg bg-gradient-to-br ${stat.bgColor} p-3 transition-all duration-200 group-hover:scale-110`}
            >
              {stat.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600 sm:text-sm">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                {stat.value}
                {stat.suffix && (
                  <span className="text-sm text-gray-500"> {stat.suffix}</span>
                )}
              </p>
            </div>
          </div>
          {stat.percentage !== undefined && (
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full bg-gradient-to-r ${stat.bgColor
                  .replace("100", "500")
                  .replace("200", "600")} transition-all duration-500`}
                style={{ width: `${stat.percentage}%` }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewStats;
