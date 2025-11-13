import React from "react";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmModal = ({ product, onClose, onConfirm }) => {
  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-full bg-red-100 p-2 sm:p-3">
              <FaExclamationTriangle className="text-lg text-red-500 sm:text-xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                Delete Product
              </h2>
              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                This action cannot be undone
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          {/* Product Preview */}
          <div className="mb-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 rounded-lg object-cover sm:h-16 sm:w-16"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 sm:h-16 sm:w-16">
                <FaTrash className="text-gray-400" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 sm:text-sm">
                SKU: {product.sku}
              </p>
              <p className="text-xs font-medium text-blue-600 sm:text-sm">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="rounded-lg bg-red-50 p-3 sm:p-4">
            <p className="text-sm leading-relaxed text-gray-700">
              Are you sure you want to delete <strong>{product.name}</strong>?
              This will permanently remove the product from your inventory.
            </p>
          </div>

          {/* Impact Info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              <span>Product details will be deleted</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              <span>Stock quantity will be removed</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              <span>This action cannot be reversed</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:justify-end sm:px-6 sm:py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto sm:px-5 sm:py-2.5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/40 sm:w-auto sm:px-5 sm:py-2.5"
          >
            <span className="flex items-center justify-center gap-2">
              <FaTrash />
              Delete Product
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
