import React, { useState } from "react";
import { X, Edit, Image, Upload, Plus } from "lucide-react";

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    _id: product._id,
    name: product.name || "",
    sku: product.sku || "",
    category: product.category || "",
    brand: product.brand || "",
    price: product.price || "",
    stock: product.stock || "",
    type: product.type || "Simple",
    size: product.size || "",
    color: product.color || "",
    description: product.description || "",
    image: product.image || "",
    createdAt: product.createdAt,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(product.image || "");
  const [variants, setVariants] = useState(product.variants || []);
  const [showVariants, setShowVariants] = useState(product.type === "Variable");

  const categories = ["Men", "Women", "Kids", "Accessories", "Books", "Shoes"];
  const productTypes = ["Simple", "Variable"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Show variants section when type is Variable
    if (name === "type") {
      setShowVariants(value === "Variable");
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData((prev) => ({
          ...prev,
          image: base64String,
        }));
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", stock: "", price: "" }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.stock || formData.stock < 0)
      newErrors.stock = "Valid stock quantity is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fill in all required fields");
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      variants: formData.type === "Variable" ? variants : [],
    };

    onUpdate(productData);
    onClose();
  };

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-3 backdrop-blur-sm sm:p-4">
      <div className="flex h-full max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-white/20 p-2">
              <Edit className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Edit Product
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white transition-all hover:rotate-90 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`w-full rounded-lg border-2 ${
                  errors.name ? "border-red-500" : "border-blue-100"
                } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* SKU and Category Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g., IND-KUR-001"
                  className={`w-full rounded-lg border-2 ${
                    errors.sku ? "border-red-500" : "border-blue-100"
                  } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                />
                {errors.sku && (
                  <p className="mt-1 text-xs text-red-500">{errors.sku}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full rounded-lg border-2 ${
                    errors.category ? "border-red-500" : "border-blue-100"
                  } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Price and Stock Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full rounded-lg border-2 ${
                    errors.price ? "border-red-500" : "border-blue-100"
                  } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className={`w-full rounded-lg border-2 ${
                    errors.stock ? "border-red-500" : "border-blue-100"
                  } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                />
                {errors.stock && (
                  <p className="mt-1 text-xs text-red-500">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
                className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Product Type */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Product Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Simple: Single product | Variable: Product with variants (sizes,
                colors, etc.)
              </p>
            </div>

            {/* Size and Color Row - Only for Simple Products */}
            {formData.type === "Simple" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="e.g., M, L, XL"
                    className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Enter color"
                    className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
            )}

            {/* Variants Section - Only for Variable Products */}
            {formData.type === "Variable" && (
              <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      Product Variants
                    </h3>
                    <p className="text-xs text-gray-600">
                      Add different variations of this product
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-purple-700"
                  >
                    <Plus className="h-3 w-3" />
                    Add Variant
                  </button>
                </div>

                {variants.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-purple-300 bg-white p-6 text-center">
                    <p className="text-sm text-gray-500">
                      No variants added yet. Click "Add Variant" to create
                      variations.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-purple-200 bg-white p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-700">
                            Variant {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="rounded-full p-1 text-red-500 transition-all hover:bg-red-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Size
                            </label>
                            <input
                              type="text"
                              value={variant.size}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "size",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., S, M, L"
                              className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Color
                            </label>
                            <input
                              type="text"
                              value={variant.color}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "color",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., Red, Blue"
                              className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Stock
                            </label>
                            <input
                              type="number"
                              value={variant.stock}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "stock",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              min="0"
                              className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Price (₹)
                            </label>
                            <input
                              type="number"
                              value={variant.price}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Product Image
              </label>

              {!imagePreview ? (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-8 transition-all hover:border-blue-500 hover:bg-blue-100">
                  <Upload className="mb-2 h-10 w-10 text-blue-500" />
                  <span className="mb-1 text-sm font-medium text-gray-700">
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative rounded-lg border-2 border-blue-300 p-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-4 top-4 rounded-full bg-red-500 p-2 text-white shadow-lg transition-all hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {errors.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image}</p>
              )}

              {/* Alternative: Image URL */}
              <div className="mt-3">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Or paste image URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 pr-10 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <Image className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="3"
                className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:justify-end sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto sm:px-5 sm:py-2.5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-indigo-600 hover:to-indigo-700 hover:shadow-xl sm:w-auto sm:px-5 sm:py-2.5"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;

// import React, { useState } from "react";
// import { FaTimes, FaEdit, FaImage } from "react-icons/fa";
// import toast from "react-hot-toast";

// const EditProductModal = ({ product, onClose, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     _id: product._id,
//     name: product.name || "",
//     sku: product.sku || "",
//     category: product.category || "",
//     brand: product.brand || "",
//     price: product.price || "",
//     stock: product.stock || "",
//     size: product.size || "",
//     color: product.color || "",
//     description: product.description || "",
//     image: product.image || "",
//     createdAt: product.createdAt,
//   });

//   const [errors, setErrors] = useState({});

//   const categories = ["Men", "Women", "Kids", "Accessories", "Shoes"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Product name is required";
//     if (!formData.sku.trim()) newErrors.sku = "SKU is required";
//     if (!formData.category) newErrors.category = "Category is required";
//     if (!formData.price || formData.price <= 0)
//       newErrors.price = "Valid price is required";
//     if (!formData.stock || formData.stock < 0)
//       newErrors.stock = "Valid stock quantity is required";

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     const productData = {
//       ...formData,
//       price: parseFloat(formData.price),
//       stock: parseInt(formData.stock),
//     };

//     onUpdate(productData);
//     onClose();
//   };

//   return (
//     <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-3 backdrop-blur-sm sm:p-4">
//       <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3 sm:px-6 sm:py-4">
//           <div className="flex items-center gap-2">
//             <div className="rounded-lg bg-white/20 p-2">
//               <FaEdit className="text-white" />
//             </div>
//             <h2 className="text-lg font-bold text-white sm:text-xl">
//               Edit Product
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-lg p-1.5 text-white transition-all hover:rotate-90 hover:bg-white/20"
//           >
//             <FaTimes className="text-lg" />
//           </button>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="max-h-[calc(100vh-200px)] overflow-y-auto p-4 sm:p-6"
//         >
//           <div className="space-y-4">
//             {/* Product Name */}
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                 Product Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter product name"
//                 className={`w-full rounded-lg border-2 ${
//                   errors.name ? "border-red-500" : "border-blue-100"
//                 } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-xs text-red-500">{errors.name}</p>
//               )}
//             </div>

//             {/* SKU and Category Row */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                   SKU <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="sku"
//                   value={formData.sku}
//                   onChange={handleChange}
//                   placeholder="e.g., IND-KUR-001"
//                   className={`w-full rounded-lg border-2 ${
//                     errors.sku ? "border-red-500" : "border-blue-100"
//                   } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 />
//                 {errors.sku && (
//                   <p className="mt-1 text-xs text-red-500">{errors.sku}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className={`w-full rounded-lg border-2 ${
//                     errors.category ? "border-red-500" : "border-blue-100"
//                   } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 >
//                   <option value="">Select category</option>
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && (
//                   <p className="mt-1 text-xs text-red-500">{errors.category}</p>
//                 )}
//               </div>
//             </div>

//             {/* Price and Stock Row */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                   Price (₹) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   min="0"
//                   step="0.01"
//                   className={`w-full rounded-lg border-2 ${
//                     errors.price ? "border-red-500" : "border-blue-100"
//                   } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 />
//                 {errors.price && (
//                   <p className="mt-1 text-xs text-red-500">{errors.price}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                   Stock Quantity <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   placeholder="0"
//                   min="0"
//                   className={`w-full rounded-lg border-2 ${
//                     errors.stock ? "border-red-500" : "border-blue-100"
//                   } px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 />
//                 {errors.stock && (
//                   <p className="mt-1 text-xs text-red-500">{errors.stock}</p>
//                 )}
//               </div>
//             </div>

//             {/* Brand */}
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                 Brand
//               </label>
//               <input
//                 type="text"
//                 name="brand"
//                 value={formData.brand}
//                 onChange={handleChange}
//                 placeholder="Enter brand name"
//                 className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               />
//             </div>

//             {/* Size and Color Row */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                   Size
//                 </label>
//                 <input
//                   type="text"
//                   name="size"
//                   value={formData.size}
//                   onChange={handleChange}
//                   placeholder="e.g., M, L, XL"
//                   className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                   Color
//                 </label>
//                 <input
//                   type="text"
//                   name="color"
//                   value={formData.color}
//                   onChange={handleChange}
//                   placeholder="Enter color"
//                   className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>
//             </div>

//             {/* Image URL */}
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                 Image URL
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleChange}
//                   placeholder="https://example.com/image.jpg"
//                   className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 pr-10 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                 />
//                 <FaImage className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Enter product description"
//                 rows="3"
//                 className="w-full rounded-lg border-2 border-blue-100 px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               ></textarea>
//             </div>
//           </div>
//         </form>

//         {/* Footer */}
//         <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:justify-end sm:px-6 sm:py-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto sm:px-5 sm:py-2.5"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-indigo-600 hover:to-indigo-700 hover:shadow-xl sm:w-auto sm:px-5 sm:py-2.5"
//           >
//             Update Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProductModal;
