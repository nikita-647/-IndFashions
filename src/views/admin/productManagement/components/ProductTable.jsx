import React from "react";
import { Eye, Edit, Trash2, Package } from "lucide-react";

const ProductTable = ({ products, isLoading, onView, onEdit, onDelete }) => {
  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-100 text-red-700 border-red-200",
      };
    } else if (stock <= 10) {
      return {
        label: "Low Stock",
        className: "bg-orange-100 text-orange-700 border-orange-200",
      };
    } else {
      return {
        label: "In Stock",
        className: "bg-green-100 text-green-700 border-green-200",
      };
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
          Products Lists
        </h2>
        <p className="mt-1 text-xs text-gray-600 sm:text-sm">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-hidden rounded-lg border border-blue-100 xl:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-sm text-white">
              <tr>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  #
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Product
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  SKU
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Category
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Type
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Price
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Stock
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Variants
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Status
                </th>
                <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {products.length ? (
                products.map((product, idx) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr
                      key={product._id}
                      className="transition-all duration-200 hover:bg-blue-50/50"
                    >
                      <td className="px-3 py-3 font-medium text-gray-700 xl:px-4 xl:py-4">
                        {idx + 1}
                      </td>
                      <td className="px-3 py-3 xl:px-4 xl:py-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="truncate font-medium text-gray-800">
                              {product.name}
                            </div>
                            {product.brand && (
                              <div className="truncate text-xs text-gray-500">
                                {product.brand}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 xl:px-4 xl:py-4">
                        {product.sku}
                      </td>
                      <td className="px-3 py-3 xl:px-4 xl:py-4">
                        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-3 py-3 xl:px-4 xl:py-4">
                        <span className="inline-flex rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
                          {product.type || "Simple"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-gray-800 xl:px-4 xl:py-4">
                        ₹{product.price.toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-gray-800 xl:px-4 xl:py-4">
                        {product.stock}
                      </td>
                      <td className="px-3 py-3 xl:px-4 xl:py-4">
                        {product.variants && product.variants.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {product.variants.slice(0, 2).map((variant, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                              >
                                {variant.size || variant.color || variant.name}
                              </span>
                            ))}
                            {product.variants.length > 2 && (
                              <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                                +{product.variants.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-3 py-3 xl:px-4 xl:py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${stockStatus.className}`}
                        >
                          {stockStatus.label}
                        </span>
                      </td>
                      <td className="px-3 py-3 xl:px-4 xl:py-4">
                        <div className="flex flex-wrap gap-1.5 xl:gap-2">
                          <button
                            onClick={() => onView(product)}
                            className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-all duration-200 hover:bg-blue-200 hover:shadow-md"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onEdit(product)}
                            className="rounded-lg bg-indigo-100 p-2 text-indigo-600 transition-all duration-200 hover:bg-indigo-200 hover:shadow-md"
                            title="Edit Product"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDelete(product)}
                            className="rounded-lg bg-red-100 p-2 text-red-600 transition-all duration-200 hover:bg-red-200 hover:shadow-md"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Package className="h-12 w-12 text-blue-200" />
                      <p className="text-base font-medium">No products found</p>
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

      {/* Card View - Mobile/Tablet */}
      <div className="space-y-3 sm:space-y-4 xl:hidden">
        {products.length ? (
          products.map((product, idx) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div
                key={product._id}
                className="rounded-xl border border-blue-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md sm:p-4"
              >
                {/* Header */}
                <div className="mb-3 flex items-start gap-3">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 sm:h-20 sm:w-20">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 sm:text-base">
                        {product.name}
                      </h3>
                      <span className="shrink-0 text-sm font-bold text-blue-600 sm:text-base">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="mb-1 text-xs text-gray-500">{product.sku}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                        {product.category}
                      </span>
                      <span className="inline-flex rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                        {product.type || "Simple"}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${stockStatus.className}`}
                      >
                        {stockStatus.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="mb-3 grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-2">
                  <div>
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {product.stock} units
                    </p>
                  </div>
                  {product.brand && (
                    <div>
                      <p className="text-xs text-gray-500">Brand</p>
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {product.brand}
                      </p>
                    </div>
                  )}
                </div>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1.5 text-xs font-medium text-gray-600">
                      Variants ({product.variants.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.slice(0, 4).map((variant, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                        >
                          {variant.size || variant.color || variant.name}
                        </span>
                      ))}
                      {product.variants.length > 4 && (
                        <span className="inline-flex items-center rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600">
                          +{product.variants.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2 border-t border-blue-100 pt-3">
                  <button
                    onClick={() => onView(product)}
                    className="flex flex-col items-center justify-center gap-1 rounded-lg bg-blue-100 px-2 py-2 text-blue-600 transition-all duration-200 hover:bg-blue-200 active:scale-95"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-xs font-medium">View</span>
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="flex flex-col items-center justify-center gap-1 rounded-lg bg-indigo-100 px-2 py-2 text-indigo-600 transition-all duration-200 hover:bg-indigo-200 active:scale-95"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="text-xs font-medium">Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="flex flex-col items-center justify-center gap-1 rounded-lg bg-red-100 px-2 py-2 text-red-600 transition-all duration-200 hover:bg-red-200 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="text-xs font-medium">Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
            <Package className="h-12 w-12 text-blue-200" />
            <p className="text-sm font-medium sm:text-base">
              No products found
            </p>
            <p className="text-xs text-gray-400 sm:text-sm">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;

// import React from "react";
// import { FaEye, FaEdit, FaTrash, FaBox } from "react-icons/fa";

// const ProductTable = ({ products, isLoading, onView, onEdit, onDelete }) => {
//   const getStockStatus = (stock) => {
//     if (stock === 0) {
//       return {
//         label: "Out of Stock",
//         className: "bg-red-100 text-red-700 border-red-200",
//       };
//     } else if (stock <= 10) {
//       return {
//         label: "Low Stock",
//         className: "bg-orange-100 text-orange-700 border-orange-200",
//       };
//     } else {
//       return {
//         label: "In Stock",
//         className: "bg-green-100 text-green-700 border-green-200",
//       };
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="rounded-xl border border-blue-100 bg-white p-4 sm:p-6">
//         <div className="space-y-3 sm:space-y-4">
//           {[...Array(5)].map((_, idx) => (
//             <div
//               key={idx}
//               className="h-16 animate-pulse rounded-lg bg-gray-200 sm:h-20"
//             ></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative rounded-xl border border-blue-100 bg-white p-3 shadow-lg shadow-blue-100/50 sm:p-4 lg:p-6">
//       {/* Header */}
//       <div className="mb-4 sm:mb-5 lg:mb-6">
//         <h2 className="text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
//           Products Lists
//         </h2>
//         <p className="mt-1 text-xs text-gray-600 sm:text-sm">
//           {products.length} product{products.length !== 1 ? "s" : ""} found
//         </p>
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden overflow-hidden rounded-lg border border-blue-100 xl:block">
//         <div className="w-full overflow-x-auto">
//           <table className="w-full min-w-full text-left text-sm">
//             <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-sm text-white">
//               <tr>
//                 <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
//                   #
//                 </th>
//                 <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
//                   Product
//                 </th>
//                 <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
//                   SKU
//                 </th>
//                 <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
//                   Category
//                 </th>
//                 <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
//                   Price
//                 </th>
//                 <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
//                   Stock
//                 </th>
//                 <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
//                   Status
//                 </th>
//                 <th className="border-b border-blue-400/30 px-3 py-3 font-semibold xl:px-4 xl:py-4">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-blue-50">
//               {products.length ? (
//                 products.map((product, idx) => {
//                   const stockStatus = getStockStatus(product.stock);
//                   return (
//                     <tr
//                       key={product._id}
//                       className="transition-all duration-200 hover:bg-blue-50/50"
//                     >
//                       <td className="px-3 py-3 font-medium text-gray-700 xl:px-4 xl:py-4">
//                         {idx + 1}
//                       </td>
//                       <td className="px-3 py-3 xl:px-4 xl:py-4">
//                         <div className="flex items-center gap-3">
//                           {product.image ? (
//                             <img
//                               src={product.image}
//                               alt={product.name}
//                               className="h-10 w-10 rounded-lg object-cover"
//                             />
//                           ) : (
//                             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//                               <FaBox className="text-gray-400" />
//                             </div>
//                           )}
//                           <div className="min-w-0">
//                             <div className="truncate font-medium text-gray-800">
//                               {product.name}
//                             </div>
//                             {product.brand && (
//                               <div className="truncate text-xs text-gray-500">
//                                 {product.brand}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-3 py-3 text-sm text-gray-600 xl:px-4 xl:py-4">
//                         {product.sku}
//                       </td>
//                       <td className="px-3 py-3 xl:px-4 xl:py-4">
//                         <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
//                           {product.category}
//                         </span>
//                       </td>
//                       <td className="px-3 py-3 text-sm font-semibold text-gray-800 xl:px-4 xl:py-4">
//                         ₹{product.price.toLocaleString("en-IN")}
//                       </td>
//                       <td className="px-3 py-3 text-sm font-semibold text-gray-800 xl:px-4 xl:py-4">
//                         {product.stock}
//                       </td>
//                       <td className="px-3 py-3 xl:px-4 xl:py-4">
//                         <span
//                           className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${stockStatus.className}`}
//                         >
//                           {stockStatus.label}
//                         </span>
//                       </td>
//                       <td className="px-3 py-3 xl:px-4 xl:py-4">
//                         <div className="flex flex-wrap gap-1.5 xl:gap-2">
//                           <button
//                             onClick={() => onView(product)}
//                             className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-all duration-200 hover:bg-blue-200 hover:shadow-md"
//                             title="View Details"
//                           >
//                             <FaEye className="text-sm" />
//                           </button>
//                           <button
//                             onClick={() => onEdit(product)}
//                             className="rounded-lg bg-indigo-100 p-2 text-indigo-600 transition-all duration-200 hover:bg-indigo-200 hover:shadow-md"
//                             title="Edit Product"
//                           >
//                             <FaEdit className="text-sm" />
//                           </button>
//                           <button
//                             onClick={() => onDelete(product)}
//                             className="rounded-lg bg-red-100 p-2 text-red-600 transition-all duration-200 hover:bg-red-200 hover:shadow-md"
//                             title="Delete"
//                           >
//                             <FaTrash className="text-sm" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="py-12 text-center text-gray-500">
//                     <div className="flex flex-col items-center justify-center gap-2">
//                       <FaBox className="text-5xl text-blue-200" />
//                       <p className="text-base font-medium">No products found</p>
//                       <p className="text-sm text-gray-400">
//                         Try adjusting your filters
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Card View - Mobile/Tablet */}
//       <div className="space-y-3 sm:space-y-4 xl:hidden">
//         {products.length ? (
//           products.map((product, idx) => {
//             const stockStatus = getStockStatus(product.stock);
//             return (
//               <div
//                 key={product._id}
//                 className="rounded-xl border border-blue-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md sm:p-4"
//               >
//                 {/* Header */}
//                 <div className="mb-3 flex items-start gap-3">
//                   {product.image ? (
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
//                     />
//                   ) : (
//                     <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 sm:h-20 sm:w-20">
//                       <FaBox className="text-2xl text-gray-400" />
//                     </div>
//                   )}
//                   <div className="min-w-0 flex-1">
//                     <div className="mb-1 flex items-start justify-between gap-2">
//                       <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 sm:text-base">
//                         {product.name}
//                       </h3>
//                       <span className="shrink-0 text-sm font-bold text-blue-600 sm:text-base">
//                         ₹{product.price.toLocaleString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mb-1 text-xs text-gray-500">{product.sku}</p>
//                     <div className="flex flex-wrap items-center gap-2">
//                       <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
//                         {product.category}
//                       </span>
//                       <span
//                         className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${stockStatus.className}`}
//                       >
//                         {stockStatus.label}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Info Grid */}
//                 <div className="mb-3 grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-2">
//                   <div>
//                     <p className="text-xs text-gray-500">Stock</p>
//                     <p className="text-sm font-semibold text-gray-800">
//                       {product.stock} units
//                     </p>
//                   </div>
//                   {product.brand && (
//                     <div>
//                       <p className="text-xs text-gray-500">Brand</p>
//                       <p className="truncate text-sm font-semibold text-gray-800">
//                         {product.brand}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Actions */}
//                 <div className="grid grid-cols-3 gap-2 border-t border-blue-100 pt-3">
//                   <button
//                     onClick={() => onView(product)}
//                     className="flex flex-col items-center justify-center gap-1 rounded-lg bg-blue-100 px-2 py-2 text-blue-600 transition-all duration-200 hover:bg-blue-200 active:scale-95"
//                   >
//                     <FaEye className="text-xs sm:text-sm" />
//                     <span className="text-xs font-medium">View</span>
//                   </button>
//                   <button
//                     onClick={() => onEdit(product)}
//                     className="flex flex-col items-center justify-center gap-1 rounded-lg bg-indigo-100 px-2 py-2 text-indigo-600 transition-all duration-200 hover:bg-indigo-200 active:scale-95"
//                   >
//                     <FaEdit className="text-xs sm:text-sm" />
//                     <span className="text-xs font-medium">Edit</span>
//                   </button>
//                   <button
//                     onClick={() => onDelete(product)}
//                     className="flex flex-col items-center justify-center gap-1 rounded-lg bg-red-100 px-2 py-2 text-red-600 transition-all duration-200 hover:bg-red-200 active:scale-95"
//                   >
//                     <FaTrash className="text-xs sm:text-sm" />
//                     <span className="text-xs font-medium">Delete</span>
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
//             <FaBox className="text-4xl text-blue-200 sm:text-5xl" />
//             <p className="text-sm font-medium sm:text-base">
//               No products found
//             </p>
//             <p className="text-xs text-gray-400 sm:text-sm">
//               Try adjusting your filters
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductTable;
