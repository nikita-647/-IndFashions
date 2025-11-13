// // src/views/admin/reviewManagement/components/ReviewDetailsModal.jsx
// import React, { useState } from "react";
// import {
//   FaTimes,
//   FaStar,
//   FaUser,
//   FaBox,
//   FaCalendar,
//   FaReply,
// } from "react-icons/fa";
// import toast from "react-hot-toast";

// const ReviewDetailsModal = ({ review, onClose, onReply, onUpdateStatus }) => {
//   const [replyText, setReplyText] = useState(review?.adminReply || "");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleReplySubmit = async () => {
//     if (!replyText.trim()) {
//       toast.error("Please enter a reply");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await onReply(review._id, replyText);
//       toast.success("Reply posted successfully");
//       onClose();
//     } catch (error) {
//       toast.error("Failed to post reply");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700 border-green-200";
//       case "pending":
//         return "bg-orange-100 text-orange-700 border-orange-200";
//       case "rejected":
//         return "bg-red-100 text-red-700 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, idx) => (
//       <FaStar
//         key={idx}
//         className={`${
//           idx < rating ? "text-yellow-400" : "text-gray-300"
//         } text-lg`}
//       />
//     ));
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
//       <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
//         {/* Header */}
//         <div className="sticky top-0 z-10 border-b border-blue-100 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-white">Review Details</h2>
//             <button
//               onClick={onClose}
//               className="rounded-lg p-1.5 text-white transition-colors hover:rotate-90 hover:bg-white/20"
//             >
//               <FaTimes className="text-xl" />
//             </button>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="space-y-6 p-6">
//           {/* Review Info */}
//           <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
//             <div className="mb-4 flex items-start justify-between">
//               <div className="flex-1">
//                 <div className="mb-2 flex items-center gap-2">
//                   {renderStars(review.rating)}
//                   <span className="text-lg font-bold text-gray-800">
//                     {review.rating}.0
//                   </span>
//                 </div>
//                 <p className="text-gray-800">{review.reviewText}</p>
//               </div>
//               <span
//                 className={`ml-4 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
//                   review.status
//                 )}`}
//               >
//                 {review.status}
//               </span>
//             </div>

//             {/* Review Meta */}
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <FaUser className="text-blue-500" />
//                 <span className="font-medium">Customer:</span>
//                 <span>{review.userName}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <FaBox className="text-blue-500" />
//                 <span className="font-medium">Product:</span>
//                 <span className="truncate">{review.productName}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <FaCalendar className="text-blue-500" />
//                 <span className="font-medium">Date:</span>
//                 <span>
//                   {new Date(review.createdAt).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </span>
//               </div>
//               {review.isVerifiedPurchase && (
//                 <div className="flex items-center gap-2 text-sm">
//                   <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
//                     ✓ Verified Purchase
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Admin Reply Section */}
//           <div>
//             <div className="mb-3 flex items-center gap-2">
//               <FaReply className="text-blue-500" />
//               <h3 className="font-semibold text-gray-800">Admin Reply</h3>
//             </div>
//             {review.adminReply ? (
//               <div className="rounded-lg border border-green-100 bg-green-50 p-4">
//                 <p className="text-sm text-gray-700">{review.adminReply}</p>
//                 <p className="mt-2 text-xs text-gray-500">
//                   Replied on{" "}
//                   {new Date(review.repliedAt).toLocaleDateString("en-IN")}
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <textarea
//                   value={replyText}
//                   onChange={(e) => setReplyText(e.target.value)}
//                   placeholder="Write your reply to the customer..."
//                   rows="4"
//                   className="w-full rounded-lg border-2 border-blue-100 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
//                 />
//                 <button
//                   onClick={handleReplySubmit}
//                   disabled={isSubmitting}
//                   className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 sm:w-auto"
//                 >
//                   {isSubmitting ? "Posting..." : "Post Reply"}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           {review.status !== "approved" && review.status !== "rejected" && (
//             <div className="flex flex-col gap-3 border-t border-blue-100 pt-4 sm:flex-row">
//               <button
//                 onClick={() => onUpdateStatus(review._id, "approved")}
//                 className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700"
//               >
//                 Approve Review
//               </button>
//               <button
//                 onClick={() => onUpdateStatus(review._id, "rejected")}
//                 className="flex-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700"
//               >
//                 Reject Review
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//               <div className="border-t border-blue-100 bg-gray
//       {/* Footer */}
//         <div className="border-t border-blue-100 bg-gray-50 px-6 py-4">
//           <button
//             onClick={onClose}
//             className="w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewDetailsModal;
// src/views/admin/reviewManagement/components/ReviewDetailsModal.jsx
import React, { useState } from "react";
import {
  FaTimes,
  FaStar,
  FaUser,
  FaBox,
  FaCalendar,
  FaReply,
} from "react-icons/fa";
import toast from "react-hot-toast";

const ReviewDetailsModal = ({ review, onClose, onReply, onUpdateStatus }) => {
  const [replyText, setReplyText] = useState(review?.adminReply || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    setIsSubmitting(true);
    try {
      await onReply(review._id, replyText);
      toast.success("Reply posted successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to post reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200"; // Green for Approved remains standard
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200"; // Orange for Pending remains standard
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"; // Red for Rejected remains standard
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, idx) => (
      <FaStar
        key={idx}
        className={`${
          idx < rating ? "text-yellow-500" : "text-gray-300" // Changed star color from 400 to 500 for a richer gold
        } text-lg`}
      />
    ));
  };

  // --- Ind Fashions Theme Colors ---
  const PRIMARY_COLOR_CLASSES = "from-red-700 to-red-800"; // Deep Maroon Gradient
  const TEXT_COLOR = "text-red-700"; // Maroon Text
  const BG_COLOR_LIGHT = "bg-yellow-50/50"; // Light Beige/Gold background
  const BORDER_COLOR = "border-red-200"; // Muted Maroon Border
  const FOCUS_COLOR = "focus:border-red-700 focus:ring-red-200"; // Maroon Focus

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div
          className={`sticky top-0 z-10 border-b ${BORDER_COLOR} bg-gradient-to-r ${PRIMARY_COLOR_CLASSES} px-6 py-4`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Review Details</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-white transition-colors hover:rotate-90 hover:bg-white/20"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Review Info */}
          <div
            className={`rounded-xl border ${BORDER_COLOR} ${BG_COLOR_LIGHT} p-4`}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-lg font-bold text-gray-800">
                    {review.rating}.0
                  </span>
                </div>
                <p className="text-gray-800">{review.reviewText}</p>
              </div>
              <span
                className={`ml-4 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
                  review.status
                )}`}
              >
                {review.status}
              </span>
            </div>

            {/* Review Meta */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaUser className={TEXT_COLOR} />
                <span className="font-medium">Customer:</span>
                <span>{review.userName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaBox className={TEXT_COLOR} />
                <span className="font-medium">Product:</span>
                <span className="truncate">{review.productName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaCalendar className={TEXT_COLOR} />
                <span className="font-medium">Date:</span>
                <span>
                  {new Date(review.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              {review.isVerifiedPurchase && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    ✓ Verified Purchase
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Admin Reply Section */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FaReply className={TEXT_COLOR} />
              <h3 className="font-semibold text-gray-800">Admin Reply</h3>
            </div>
            {review.adminReply ? (
              <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                <p className="text-sm text-gray-700">{review.adminReply}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Replied on{" "}
                  {new Date(review.repliedAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply to the customer..."
                  rows="4"
                  className={`w-full rounded-lg border-2 ${BORDER_COLOR} bg-white px-4 py-3 text-sm outline-none transition-all ${FOCUS_COLOR}`}
                />
                <button
                  onClick={handleReplySubmit}
                  disabled={isSubmitting}
                  className={`w-full rounded-lg bg-gradient-to-r ${PRIMARY_COLOR_CLASSES} px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-red-800 hover:to-red-900 disabled:opacity-50 sm:w-auto`}
                >
                  {isSubmitting ? "Posting..." : "Post Reply"}
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {review.status !== "approved" && review.status !== "rejected" && (
            <div
              className={`flex flex-col gap-3 border-t ${BORDER_COLOR} pt-4 sm:flex-row`}
            >
              <button
                onClick={() => onUpdateStatus(review._id, "approved")}
                className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700"
              >
                Approve Review
              </button>
              <button
                onClick={() => onUpdateStatus(review._id, "rejected")}
                className="flex-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700"
              >
                Reject Review
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
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

export default ReviewDetailsModal;
