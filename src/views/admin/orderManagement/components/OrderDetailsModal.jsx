import React from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

const statusConfig = {
  pending: { label: "Pending", icon: Clock },
  processing: { label: "Processing", icon: Package },
  shipped: { label: "Shipped", icon: Truck },
  delivered: { label: "Delivered", icon: CheckCircle },
  cancelled: { label: "Cancelled", icon: XCircle },
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-3 backdrop-blur-sm sm:p-4">
      <div className="flex h-full max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Order Details
            </h2>
            <p className="text-sm text-blue-100">{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white transition-all hover:rotate-90 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Status Update */}
          <div className="mb-6 rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Update Order Status
            </label>
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value)}
              className="w-full rounded-lg border-2 border-blue-300 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-bold text-gray-800">
              Customer Information
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <User className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500">Customer Name</div>
                  <div className="text-sm font-medium text-gray-800">
                    {order.customerName}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm font-medium text-gray-800">
                    {order.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-sm font-medium text-gray-800">
                    {order.phone}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500">Order Date</div>
                  <div className="text-sm font-medium text-gray-800">
                    {formatDate(order.orderDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-bold text-gray-800">
              Shipping Address
            </h3>
            <div className="flex gap-3 rounded-lg bg-gray-50 p-4">
              <MapPin className="h-5 w-5 shrink-0 text-blue-500" />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {order.shippingAddress.street}
                </div>
                <div className="text-sm text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </div>
                <div className="text-sm text-gray-600">
                  PIN: {order.shippingAddress.pincode}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-bold text-gray-800">
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Qty: {item.qty}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <h3 className="mb-3 text-lg font-bold text-gray-800">
              Payment Summary
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Method</span>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-800">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Status</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "refunded"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className="my-2 border-t border-blue-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex shrink-0 gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border-2 border-gray-300 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100"
          >
            Close
          </button>
          <button className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 py-2 text-sm font-semibold text-white transition-all hover:from-blue-600 hover:to-blue-700">
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
