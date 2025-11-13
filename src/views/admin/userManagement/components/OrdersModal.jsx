// src/views/admin/userManagement/components/OrdersModal.jsx
import React, { useState } from "react";
import {
  FaTimes,
  FaBox,
  FaEye,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const OrdersModal = ({ user, orders, onClose }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Mock orders data - Replace with actual API call
  const defaultOrders = [
    {
      _id: "1",
      orderId: "ORD-2024-001",
      orderDate: "2024-10-20",
      status: "Delivered",
      totalAmount: 2598,
      items: [
        {
          productName: "Cotton Kurti - Blue Floral",
          productImage: "https://via.placeholder.com/80",
          quantity: 2,
          price: 1299,
        },
      ],
      deliveryDate: "2024-10-25",
      paymentMethod: "UPI",
    },
    {
      _id: "2",
      orderId: "ORD-2024-002",
      orderDate: "2024-10-18",
      status: "Shipped",
      totalAmount: 8999,
      items: [
        {
          productName: "Designer Lehenga - Pink",
          productImage: "https://via.placeholder.com/80",
          quantity: 1,
          price: 8999,
        },
      ],
      expectedDelivery: "2024-10-28",
      paymentMethod: "Card",
    },
    {
      _id: "3",
      orderId: "ORD-2024-003",
      orderDate: "2024-10-15",
      status: "Processing",
      totalAmount: 5298,
      items: [
        {
          productName: "Silk Saree - Traditional Red",
          productImage: "https://via.placeholder.com/80",
          quantity: 1,
          price: 3499,
        },
        {
          productName: "Formal Kurta Set - White",
          productImage: "https://via.placeholder.com/80",
          quantity: 1,
          price: 1799,
        },
      ],
      expectedDelivery: "2024-10-30",
      paymentMethod: "COD",
    },
  ];

  const ordersList = orders || defaultOrders;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "processing":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-purple-100 bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                <FaBox className="text-xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {user.name}'s Orders
                </h2>
                <p className="text-xs text-white/90">
                  {ordersList.length} orders placed
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-white transition-colors hover:rotate-90 hover:bg-white/20"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {ordersList.length > 0 ? (
            <div className="space-y-4">
              {ordersList.map((order) => (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-xl border border-purple-100 bg-purple-50/30 transition-all hover:shadow-md"
                >
                  {/* Order Header */}
                  <div
                    className="flex cursor-pointer items-center justify-between p-4 hover:bg-purple-50"
                    onClick={() => toggleOrderExpand(order._id)}
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-800">
                          {order.orderId}
                        </h3>
                        <span
                          className={`rounded-full border px-3 py-0.5 text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                        <span>
                          Ordered:{" "}
                          {new Date(order.orderDate).toLocaleDateString(
                            "en-IN"
                          )}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-purple-600">
                          ₹{order.totalAmount}
                        </span>
                        <span>•</span>
                        <span>{order.items.length} item(s)</span>
                      </div>
                    </div>
                    <button className="ml-4 text-gray-600">
                      {expandedOrder === order._id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </div>

                  {/* Order Details - Expandable */}
                  {expandedOrder === order._id && (
                    <div className="border-t border-purple-100 bg-white p-4">
                      {/* Order Items */}
                      <div className="mb-4 space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Order Items:
                        </h4>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
                          >
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {item.productName}
                              </p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">
                                ₹{item.quantity * item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Info */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-lg bg-purple-50 p-3">
                          <p className="mb-1 text-xs font-medium text-gray-600">
                            Payment Method
                          </p>
                          <p className="font-semibold text-gray-800">
                            {order.paymentMethod}
                          </p>
                        </div>
                        <div className="rounded-lg bg-purple-50 p-3">
                          <p className="mb-1 text-xs font-medium text-gray-600">
                            {order.status === "Delivered"
                              ? "Delivered On"
                              : "Expected Delivery"}
                          </p>
                          <p className="font-semibold text-gray-800">
                            {new Date(
                              order.deliveryDate || order.expectedDelivery
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <FaBox className="text-6xl text-purple-200" />
              <p className="text-lg font-medium text-gray-700">No orders yet</p>
              <p className="text-sm text-gray-500">
                User hasn't placed any orders yet
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-purple-100 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
