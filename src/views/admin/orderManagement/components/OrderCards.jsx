// OrderManagement/components/OrderCards.jsx
import React from "react";
import { Calendar, Package, CreditCard } from "lucide-react";
import StatusBadge from "./StatusBadge";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrderCards = ({ orders, onViewOrder }) => {
  return (
    <div className="space-y-4 p-5 xl:hidden">
      {orders.map((order) => (
        <div
          key={order.id}
          className="hover:scale-102 group overflow-hidden rounded-2xl border-2 border-blue-100 bg-white shadow-lg shadow-blue-100/50 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-200/60"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1 text-lg font-bold text-white">
                  {order.id}
                </div>
                <div className="text-sm font-medium text-blue-100">
                  {order.customerName}
                </div>
                <div className="text-xs text-blue-200">{order.email}</div>
              </div>
              <StatusBadge status={order.status} />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4">
            {/* Order Info Grid */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-blue-50 p-3">
                <div className="mb-1 flex items-center gap-2 text-blue-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-semibold">Order Date</span>
                </div>
                <div className="text-xs font-bold text-gray-800">
                  {formatDate(order.orderDate)}
                </div>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3">
                <div className="mb-1 flex items-center gap-2 text-indigo-600">
                  <Package className="h-4 w-4" />
                  <span className="text-xs font-semibold">Items</span>
                </div>
                <div className="text-xs font-bold text-gray-800">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-3">
                <div className="text-emerald-600 mb-1 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-xs font-semibold">Payment</span>
                </div>
                <div className="text-xs font-bold text-gray-800">
                  {order.paymentMethod}
                </div>
              </div>

              <div className="bg-violet-50 rounded-xl p-3">
                <div className="text-violet-600 mb-1 text-xs font-semibold">
                  Total Amount
                </div>
                <div className="text-violet-700 text-lg font-bold">
                  ₹{order.total.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600">
                Products:
              </span>
              <div className="flex -space-x-2">
                {order.items.map((item, idx) => (
                  <img
                    key={idx}
                    src={item.image}
                    alt={item.name}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md"
                    title={item.name}
                  />
                ))}
              </div>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => onViewOrder(order)}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            >
              View Full Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCards;
