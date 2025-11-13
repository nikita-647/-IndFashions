// src/views/admin/userManagement/components/CartModal.jsx
import React from "react";
import {
  FaTimes,
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

const CartModal = ({ user, cartItems, onClose }) => {
  // Mock cart data - Replace with actual API call
  const defaultCartItems = [
    {
      _id: "1",
      productId: "prod1",
      productName: "Cotton Kurti - Blue Floral",
      productImage: "https://via.placeholder.com/100",
      price: 1299,
      originalPrice: 1999,
      quantity: 2,
      size: "M",
      color: "Blue",
      addedDate: "2024-10-22",
    },
    {
      _id: "2",
      productId: "prod2",
      productName: "Formal Kurta Set - White",
      productImage: "https://via.placeholder.com/100",
      price: 1799,
      originalPrice: 2499,
      quantity: 1,
      size: "L",
      color: "White",
      addedDate: "2024-10-23",
    },
  ];

  const items = cartItems || defaultCartItems;
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = items.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-blue-100 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                <FaShoppingCart className="text-xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {user.name}'s Cart
                </h2>
                <p className="text-xs text-white/90">
                  {items.length} items in cart
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
          {items.length > 0 ? (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50/30 p-4 sm:flex-row"
                  >
                    {/* Product Image */}
                    <div className="h-32 w-full overflow-hidden rounded-lg sm:h-24 sm:w-24">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-gray-800">
                        {item.productName}
                      </h3>
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <span className="rounded-full bg-gray-100 px-2 py-1">
                          Size: {item.size}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2 py-1">
                          Color: {item.color}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">
                          ₹{item.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white">
                        <button className="p-2 text-gray-600 hover:text-blue-600">
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="min-w-[2rem] text-center font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button className="p-2 text-gray-600 hover:text-blue-600">
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button className="rounded-lg bg-red-100 p-2 text-red-600 transition-all hover:bg-red-200">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="flex items-center justify-between border-t border-blue-100 pt-3 sm:border-0 sm:pt-0">
                      <span className="text-sm font-medium text-gray-600 sm:hidden">
                        Item Total:
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-3 font-semibold text-gray-800">
                  Price Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-800">
                      ₹{subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-green-600">
                      -₹{discount}
                    </span>
                  </div>
                  <div className="border-t border-blue-200 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        ₹{total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <FaShoppingCart className="text-6xl text-blue-200" />
              <p className="text-lg font-medium text-gray-700">Cart is empty</p>
              <p className="text-sm text-gray-500">
                User hasn't added any products to cart yet
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-blue-100 bg-gray-50 px-6 py-4">
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

export default CartModal;
