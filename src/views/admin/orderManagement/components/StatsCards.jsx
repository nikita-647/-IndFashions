// OrderManagement/components/StatsCards.jsx
import React from "react";
import {
  ShoppingBag,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";

const StatsCards = ({ stats }) => {
  const statsData = [
    {
      label: "Total Orders",
      value: stats.total,
      icon: ShoppingBag,
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      gradient: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
    },
    {
      label: "Processing",
      value: stats.processing,
      icon: Package,
      gradient: "from-blue-400 to-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200",
    },
    {
      label: "Shipped",
      value: stats.shipped,
      icon: Truck,
      gradient: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-200",
    },
    {
      label: "Delivered",
      value: stats.delivered,
      icon: CheckCircle,
      gradient: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      gradient: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      label: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      gradient: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50",
      iconColor: "text-violet-600",
      borderColor: "border-violet-200",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
      {statsData.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`group relative overflow-hidden rounded-2xl border-2 ${stat.borderColor} bg-white p-5 shadow-lg shadow-blue-100/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/60`}
          >
            {/* Background Decoration */}
            <div
              className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 transition-all duration-300 group-hover:scale-150`}
            ></div>

            {/* Icon */}
            <div
              className={`mb-3 inline-flex rounded-xl ${stat.bgColor} p-3 shadow-sm`}
            >
              <Icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>

            {/* Value */}
            <div className="mb-1 text-2xl font-bold text-gray-800 lg:text-3xl">
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-xs font-medium text-gray-600 lg:text-sm">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
