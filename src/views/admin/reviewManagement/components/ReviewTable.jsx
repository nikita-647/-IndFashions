import React, { useState } from "react";
import { FaEye, FaTrash, FaCheckCircle, FaBan, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";

const ReviewTable = ({
  reviews,
  isLoading,
  onViewDetails,
  onDelete,
  onUpdateStatus,
}) => {
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, idx) => (
      <FaStar
        key={idx}
        className={`${
          idx < rating ? "text-yellow-400" : "text-gray-300"
        } text-xs sm:text-sm`}
      />
    ));
  };

  const handleDeleteClick = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDelete(selectedReviewId);
      toast.success("Review deleted successfully");
      setShowDeleteModal(false);
      setSelectedReviewId(null);
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  const handleStatusUpdate = async (reviewId, status) => {
    try {
      await onUpdateStatus(reviewId, status);
      toast.success(`Review ${status} successfully`);
    } catch (error) {
      toast.error(`Failed to ${status} review`);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-blue-100 bg-white p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="h-16 animate-pulse rounded-lg bg-gray-200 sm:h-20"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl border border-blue-100 bg-white p-3 shadow-lg shadow-blue-100/50 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-5 lg:mb-6">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
          Customer Reviews
        </h2>
        <p className="mt-1 text-xs text-gray-600 sm:text-sm">
          Manage and respond to product reviews
        </p>
      </div>

      {/* Desktop Table View - Hidden on mobile/tablet */}
      <div className="hidden overflow-hidden rounded-lg border border-blue-100 xl:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-sm text-white">
              <tr>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  #
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Customer
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Product
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Rating
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Review
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Status
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Date
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {reviews.length ? (
                reviews.map((review, idx) => (
                  <tr
                    key={review._id}
                    className="transition-all duration-200 hover:bg-blue-50/50"
                  >
                    <td className="px-3 py-3 font-medium text-gray-700 xl:px-4 xl:py-4">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-3 xl:px-4 xl:py-4">
                      <div className="font-medium text-gray-800">
                        {review.userName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {review.userEmail}
                      </div>
                      {review.isVerifiedPurchase && (
                        <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          ✓ Verified
                        </span>
                      )}
                    </td>
                    <td className="max-w-[180px] px-3 py-3 xl:max-w-[200px] xl:px-4 xl:py-4">
                      <div className="flex items-center gap-2">
                        {review.productImage && (
                          <img
                            src={review.productImage}
                            alt={review.productName}
                            className="h-9 w-9 rounded-lg object-cover xl:h-10 xl:w-10"
                          />
                        )}
                        <span className="truncate text-sm font-medium text-gray-800">
                          {review.productName}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 xl:px-4 xl:py-4">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="mt-1 block text-xs font-bold text-gray-700">
                        {review.rating}.0
                      </span>
                    </td>
                    <td className="max-w-[200px] px-3 py-3 xl:max-w-[250px] xl:px-4 xl:py-4">
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {review.reviewText}
                      </p>
                    </td>
                    <td className="px-3 py-3 xl:px-4 xl:py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium xl:px-3 ${getStatusColor(
                          review.status
                        )}`}
                      >
                        {review.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600 xl:px-4 xl:py-4">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-3 py-3 xl:px-4 xl:py-4">
                      <div className="flex flex-wrap gap-1.5 xl:gap-2">
                        <button
                          onClick={() => onViewDetails(review)}
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-all duration-200 hover:bg-blue-200 hover:shadow-md xl:p-2.5"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        {review.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(review._id, "approved")
                              }
                              className="rounded-lg bg-green-100 p-2 text-green-600 transition-all duration-200 hover:bg-green-200 hover:shadow-md xl:p-2.5"
                              title="Approve"
                            >
                              <FaCheckCircle className="text-sm" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(review._id, "rejected")
                              }
                              className="rounded-lg bg-red-100 p-2 text-red-600 transition-all duration-200 hover:bg-red-200 hover:shadow-md xl:p-2.5"
                              title="Reject"
                            >
                              <FaBan className="text-sm" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteClick(review._id)}
                          className="rounded-lg bg-red-100 p-2 text-red-600 transition-all duration-200 hover:bg-red-200 hover:shadow-md xl:p-2.5"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="text-5xl text-blue-200">⭐</div>
                      <p className="text-base font-medium">No reviews found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card View - Mobile/Tablet (below xl breakpoint) */}
      <div className="space-y-3 sm:space-y-4 xl:hidden">
        {reviews.length ? (
          reviews.map((review, idx) => (
            <div
              key={review._id}
              className="rounded-xl border border-blue-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md sm:p-4"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 sm:h-6 sm:w-6">
                      {idx + 1}
                    </span>
                    <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                      {review.userName}
                    </h3>
                    {review.isVerifiedPurchase && (
                      <span className="shrink-0 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 sm:px-2">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-gray-500">
                    {review.userEmail}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium sm:px-3 sm:py-1 ${getStatusColor(
                    review.status
                  )}`}
                >
                  {review.status}
                </span>
              </div>

              {/* Product Info */}
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-gray-50 p-2 sm:gap-3">
                {review.productImage && (
                  <img
                    src={review.productImage}
                    alt={review.productName}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover sm:h-12 sm:w-12"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-gray-800 sm:text-sm">
                    {review.productName}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    {renderStars(review.rating)}
                    <span className="ml-1 text-xs font-bold text-gray-700">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="mb-3 line-clamp-2 text-xs text-gray-600 sm:line-clamp-3 sm:text-sm">
                {review.reviewText}
              </p>

              {/* Date */}
              <div className="mb-3 text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 border-t border-blue-100 pt-3 sm:grid-cols-4">
                <button
                  onClick={() => onViewDetails(review)}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg bg-blue-100 px-2 py-2 text-blue-600 transition-all duration-200 hover:bg-blue-200"
                >
                  <FaEye className="text-xs sm:text-sm" />
                  <span className="text-xs font-medium">View</span>
                </button>
                {review.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(review._id, "approved")}
                      className="flex flex-col items-center justify-center gap-1 rounded-lg bg-green-100 px-2 py-2 text-green-600 transition-all duration-200 hover:bg-green-200"
                    >
                      <FaCheckCircle className="text-xs sm:text-sm" />
                      <span className="text-xs font-medium">Approve</span>
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(review._id, "rejected")}
                      className="flex flex-col items-center justify-center gap-1 rounded-lg bg-orange-100 px-2 py-2 text-orange-600 transition-all duration-200 hover:bg-orange-200"
                    >
                      <FaBan className="text-xs sm:text-sm" />
                      <span className="text-xs font-medium">Reject</span>
                    </button>
                  </>
                ) : (
                  <div className="col-span-2"></div>
                )}
                <button
                  onClick={() => handleDeleteClick(review._id)}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg bg-red-100 px-2 py-2 text-red-600 transition-all duration-200 hover:bg-red-200"
                >
                  <FaTrash className="text-xs sm:text-sm" />
                  <span className="text-xs font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
            <div className="text-4xl text-blue-200 sm:text-5xl">⭐</div>
            <p className="text-sm font-medium sm:text-base">No reviews found</p>
            <p className="text-xs text-gray-400 sm:text-sm">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          title="Delete Review"
          message="Are you sure you want to delete this review? This action cannot be undone."
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedReviewId(null);
          }}
          onConfirm={handleDeleteConfirm}
          confirmLabel="Delete"
          confirmClass="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          icon={<FaTrash className="text-xl text-red-500 sm:text-2xl" />}
        />
      )}
    </div>
  );
};

export default ReviewTable;
