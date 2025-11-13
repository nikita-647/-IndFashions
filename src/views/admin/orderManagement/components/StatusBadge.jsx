// OrderManagement/components/StatusBadge.jsx
import React from "react";
import { Clock, Package, Truck, CheckCircle, XCircle } from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-300",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-300",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-300",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-300",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-500",
    lightColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-300",
    icon: XCircle,
  },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 ${config.borderColor} ${config.lightColor} px-3 py-1.5 text-xs font-bold ${config.textColor} shadow-sm`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
};

export default StatusBadge;
