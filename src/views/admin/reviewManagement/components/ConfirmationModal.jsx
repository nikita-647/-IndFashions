// src/views/admin/reviewManagement/components/ConfirmationModal.jsx
import React from "react";

const ConfirmationModal = ({
  title,
  message,
  onCancel,
  onConfirm,
  confirmLabel,
  confirmClass,
  icon,
}) => {
  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-full bg-gray-100 p-2 sm:p-3">{icon}</div>
            <h2 className="text-base font-bold text-gray-800 sm:text-lg">
              {title}
            </h2>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-sm leading-relaxed text-gray-600">{message}</p>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:justify-end sm:px-6 sm:py-4">
          <button
            onClick={onCancel}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto sm:px-5 sm:py-2.5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl sm:w-auto sm:px-5 sm:py-2.5 ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
