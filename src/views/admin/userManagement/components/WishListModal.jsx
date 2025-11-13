// src/views/admin/userManagement/components/WishlistModal.jsx
import React from "react";
import { FaTimes, FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

const WishlistModal = ({ user, wishlistItems, onClose }) => {
  // Mock wishlist data - Replace with actual API call
  const defaultWishlistItems = [
    {
      _id: "1",
      productId: "prod1",
      productName: "Cotton Kurti - Blue Floral",
      productImage: "https://via.placeholder.com/100",
      price: 1299,
      originalPrice: 1999,
      discount: 35,
      addedDate: "2024-10-15",
      inStock: true,
    },
    {
      _id: "2",
      productId: "prod2",
      productName: "Silk Saree - Traditional Red",
      productImage: "https://via.placeholder.com/100",
      price: 3499,
      originalPrice: 4999,
      discount: 30,
      addedDate: "2024-10-18",
      inStock: true,
    },
    {
      _id: "3",
      productId: "prod3",
      productName: "Designer Lehenga - Pink",
      productImage: "https://via.placeholder.com/100",
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      addedDate: "2024-10-20",
      inStock: false,
    },
  ];

  const items = wishlistItems || defaultWishlistItems;

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-pink-100 bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                <FaHeart className="text-xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {user.name}'s Wishlist
                </h2>
                <p className="text-xs text-white/90">
                  {items.length} items saved
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
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-xl border border-pink-100 bg-pink-50/30 p-4 transition-all hover:shadow-md sm:flex-row"
                >
                  {/* Product Image */}
                  <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-24 sm:w-24">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="h-full w-full object-cover"
                    />
                    {!item.inStock && (
                      <div className="bg-black/50 absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-gray-800">
                      {item.productName}
                    </h3>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-lg font-bold text-pink-600">
                        ₹{item.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice}
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        {item.discount}% OFF
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Added on{" "}
                      {new Date(item.addedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 sm:flex-col">
                    <button
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-200 sm:w-full sm:flex-none"
                      disabled={!item.inStock}
                    >
                      <FaShoppingCart className="text-sm" />
                      Move to Cart
                    </button>
                    <button className="rounded-lg bg-red-100 p-2 text-red-600 transition-all hover:bg-red-200">
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <FaHeart className="text-6xl text-pink-200" />
              <p className="text-lg font-medium text-gray-700">
                No items in wishlist
              </p>
              <p className="text-sm text-gray-500">
                User hasn't added any products to wishlist yet
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-pink-100 bg-gray-50 px-6 py-4">
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

export default WishlistModal;
