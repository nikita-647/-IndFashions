import React, { useState } from "react";
import { X, Star, User } from "lucide-react";

const ProductViewModal = ({ isOpen, onClose, product }) => {
  const [showReviews, setShowReviews] = useState(false);

  if (!isOpen || !product) return null;

  // Mock reviews data - replace with actual data from your backend
  const reviews = product.reviews || [
    {
      id: 1,
      userName: "Rahul Kumar",
      rating: 5,
      comment: "Excellent product! Quality is amazing and delivery was fast.",
      date: "2024-11-10",
    },
    {
      id: 2,
      userName: "Priya Sharma",
      rating: 4,
      comment: "Good product, worth the price. Packaging could be better.",
      date: "2024-11-08",
    },
    {
      id: 3,
      userName: "Amit Patel",
      rating: 5,
      comment: "Highly recommended! Exactly as described.",
      date: "2024-11-05",
    },
  ];

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-3 backdrop-blur-sm sm:p-4 lg:p-6">
      <div className="flex h-full max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl lg:rounded-3xl">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
            {showReviews ? "Product Reviews" : "Product Details"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 transition-all hover:rotate-90 hover:bg-white/20 sm:p-2"
          >
            <X className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {!showReviews ? (
            // Product Details View
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
              {/* Product Image */}
              <div className="flex h-48 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-gray-50 p-3 sm:h-64 md:h-72 lg:h-80 lg:rounded-2xl lg:p-4">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full rounded-lg object-contain lg:rounded-xl"
                  />
                ) : (
                  <svg
                    className="h-20 w-20 text-gray-300 sm:h-24 sm:w-24 lg:h-32 lg:w-32"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-3 sm:space-y-4">
                {/* Title and Price */}
                <div>
                  <h3 className="mb-1 text-xl font-bold text-gray-800 sm:mb-2 sm:text-2xl lg:text-3xl">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 sm:text-3xl lg:text-4xl">
                    ₹{parseFloat(product.price).toFixed(2)}
                  </p>
                </div>

                {/* Rating Summary */}
                <div className="flex items-center gap-2 rounded-lg bg-yellow-50 p-2 sm:p-3">
                  <div className="flex items-center gap-1">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {averageRating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"})
                  </span>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                  <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
                    <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">
                      Category
                    </p>
                    <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                      {product.category}
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
                    <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">SKU</p>
                    <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                      {product.sku}
                    </p>
                  </div>
                  {product.brand && (
                    <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
                      <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">
                        Brand
                      </p>
                      <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                        {product.brand}
                      </p>
                    </div>
                  )}
                  <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
                    <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">
                      Stock
                    </p>
                    <p
                      className={`text-xs font-semibold sm:text-sm ${
                        product.stock > 10
                          ? "text-green-600"
                          : product.stock > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.stock} units
                    </p>
                  </div>
                  {product.size && (
                    <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
                      <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">
                        Size
                      </p>
                      <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                        {product.size}
                      </p>
                    </div>
                  )}
                  {product.color && (
                    <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
                      <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">
                        Color
                      </p>
                      <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                        {product.color}
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="rounded-lg bg-gray-50 p-3 sm:rounded-xl sm:p-4">
                    <p className="mb-1 text-xs text-gray-500 sm:mb-2">
                      Description
                    </p>
                    <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Created Date */}
                <div className="pt-2 lg:pt-4">
                  <p className="text-xs text-gray-400">
                    Added on{" "}
                    {new Date(product.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Reviews View
            <div className="space-y-4">
              {/* Rating Summary */}
              <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl font-bold text-gray-800 sm:text-5xl">
                      {averageRating}
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-1 sm:justify-start">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Based on {reviews.length}{" "}
                      {reviews.length === 1 ? "review" : "reviews"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Customer Reviews
                </h3>
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {review.userName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>

              {reviews.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                  <Star className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                  <p className="text-sm text-gray-500">
                    No reviews yet for this product
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:justify-between sm:px-6 sm:py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto sm:px-6 sm:py-2.5"
          >
            Close
          </button>
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-xl sm:w-auto sm:px-6 sm:py-2.5"
          >
            <Star className="h-4 w-4" />
            {showReviews ? "View Product" : "View Reviews"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;

// import React from "react";

// const ProductViewModal = ({ isOpen, onClose, product }) => {
//   if (!isOpen || !product) return null;

//   return (
//     <div className="animate-fadeIn bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-3 backdrop-blur-sm sm:p-4 lg:p-6">
//       <div className="animate-slideUp w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl lg:rounded-3xl">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 sm:px-6 sm:py-4">
//           <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
//             Product Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="rounded-lg p-1.5 transition-all hover:rotate-90 hover:bg-white/20 sm:p-2"
//           >
//             <svg
//               className="h-5 w-5 text-white sm:h-6 sm:w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Modal Body - No Scrolling */}
//         <div className="p-4 sm:p-6 lg:p-8">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
//             {/* Product Image */}
//             <div className="flex h-48 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-gray-50 p-3 sm:h-64 md:h-72 lg:h-80 lg:rounded-2xl lg:p-4">
//               {product.image ? (
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-full w-full rounded-lg object-contain lg:rounded-xl"
//                 />
//               ) : (
//                 <svg
//                   className="h-20 w-20 text-gray-300 sm:h-24 sm:w-24 lg:h-32 lg:w-32"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               )}
//             </div>

//             {/* Product Info */}
//             <div className="space-y-3 sm:space-y-4">
//               {/* Title and Price */}
//               <div>
//                 <h3 className="mb-1 text-xl font-bold text-gray-800 sm:mb-2 sm:text-2xl lg:text-3xl">
//                   {product.name}
//                 </h3>
//                 <p className="text-2xl font-bold text-blue-600 sm:text-3xl lg:text-4xl">
//                   ₹{parseFloat(product.price).toFixed(2)}
//                 </p>
//               </div>

//               {/* Product Details Grid */}
//               <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
//                 <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
//                   <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">
//                     Category
//                   </p>
//                   <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
//                     {product.category}
//                   </p>
//                 </div>
//                 <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
//                   <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">SKU</p>
//                   <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
//                     {product.sku}
//                   </p>
//                 </div>
//                 {product.brand && (
//                   <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
//                     <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">
//                       Brand
//                     </p>
//                     <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
//                       {product.brand}
//                     </p>
//                   </div>
//                 )}
//                 <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
//                   <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">Stock</p>
//                   <p
//                     className={`text-xs font-semibold sm:text-sm ${
//                       product.stock > 10
//                         ? "text-green-600"
//                         : product.stock > 0
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {product.stock} units
//                   </p>
//                 </div>
//                 {product.size && (
//                   <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
//                     <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">Size</p>
//                     <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
//                       {product.size}
//                     </p>
//                   </div>
//                 )}
//                 {product.color && (
//                   <div className="rounded-lg bg-blue-50 p-2 sm:rounded-xl sm:p-3">
//                     <p className="mb-0.5 text-xs text-gray-500 sm:mb-1">
//                       Color
//                     </p>
//                     <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
//                       {product.color}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               {product.description && (
//                 <div className="rounded-lg bg-gray-50 p-3 sm:rounded-xl sm:p-4">
//                   <p className="mb-1 text-xs text-gray-500 sm:mb-2">
//                     Description
//                   </p>
//                   <p className="line-clamp-3 text-xs leading-relaxed text-gray-700 sm:text-sm lg:line-clamp-4">
//                     {product.description}
//                   </p>
//                 </div>
//               )}

//               {/* Created Date */}
//               <div className="pt-2 lg:pt-4">
//                 <p className="text-xs text-gray-400">
//                   Added on{" "}
//                   {new Date(product.createdAt).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modal Footer - Optional Close Button */}
//         <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4">
//           <button
//             onClick={onClose}
//             className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-xl sm:w-auto sm:px-6 sm:py-2.5"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductViewModal;
