// OrderManagement/components/OrderTable.jsx
import React from "react";
import { Eye } from "lucide-react";
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

const OrderTable = ({ orders, onViewOrder }) => {
  return (
    <div className="hidden overflow-x-auto xl:block">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">
            <th className="border-b-2 border-blue-500 px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-white">
              Order ID
            </th>
            <th className="border-b-2 border-blue-500 px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-white">
              Customer
            </th>
            <th className="border-b-2 border-blue-500 px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-white">
              Date & Time
            </th>
            <th className="border-b-2 border-blue-500 px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-white">
              Items
            </th>
            <th className="border-b-2 border-blue-500 px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-white">
              Total
            </th>
            <th className="border-b-2 border-blue-500 px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-white">
              Status
            </th>
            <th className="border-b-2 border-blue-500 px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-100">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="transition-all duration-200 hover:bg-blue-50/50"
            >
              <td className="px-6 py-4">
                <div className="font-bold text-blue-600">{order.id}</div>
              </td>
              <td className="px-6 py-4">
                <div className="font-semibold text-gray-800">
                  {order.customerName}
                </div>
                <div className="text-xs text-gray-500">{order.email}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-700">
                  {formatDate(order.orderDate)}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <img
                        key={idx}
                        src={item.image}
                        alt={item.name}
                        className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-lg font-bold text-blue-600">
                  ₹{order.total.toLocaleString("en-IN")}
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onViewOrder(order)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
