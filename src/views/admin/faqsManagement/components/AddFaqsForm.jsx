// src/views/admin/faqsManagement/components/AddFaqsForm.jsx
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaQuestionCircle, FaList, FaSort } from "react-icons/fa";
import toast from "react-hot-toast";

const AddFaqsForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    status: "published",
    order: 1,
  });

  const [formErrors, setFormErrors] = useState({});

  const categories = [
    "Shipping",
    "Returns",
    "Payment",
    "Orders",
    "Products",
    "Account",
    "General",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.question.trim()) {
      errors.question = "Question is required";
    }

    if (!formData.answer.trim()) {
      errors.answer = "Answer is required";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.order || formData.order < 1) {
      errors.order = "Order must be at least 1";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const loadingToast = toast.loading("Creating FAQ...");

    try {
      // Simulate API call - Replace with your actual API endpoint
      // const response = await axios.post('YOUR_API_ENDPOINT/faqs', formData);

      // Simulate success
      setTimeout(() => {
        toast.dismiss(loadingToast);
        toast.success("FAQ created successfully");
        console.log("Form submitted:", formData);
        onClose();
      }, 1000);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error creating FAQ");
      console.error(error);
    }
  };

  return (
    <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm transition-all duration-300">
      <div className="my-4 w-full max-w-2xl rounded-2xl border border-blue-100 bg-white shadow-2xl sm:my-6">
        {/* Header */}
        <div className="border-b border-blue-100 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-2.5 shadow-lg shadow-blue-500/30">
                <FaQuestionCircle className="text-base text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                  Add New FAQ
                </h2>
                <p className="text-xs text-gray-600">
                  Create a frequently asked question
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:rotate-90 hover:bg-red-100 hover:text-red-600"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Form - Scrollable content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Question */}
            <div className="flex flex-col">
              <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaQuestionCircle className="text-blue-500" />
                Question
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter the question"
                className={`rounded-lg border-2 ${
                  formErrors.question
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                } bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4`}
                required
              />
              {formErrors.question && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {formErrors.question}
                </p>
              )}
            </div>

            {/* Answer */}
            <div className="flex flex-col">
              <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                Answer
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                placeholder="Enter the answer"
                rows="5"
                className={`rounded-lg border-2 ${
                  formErrors.answer
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                } bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4`}
                required
              />
              {formErrors.answer && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {formErrors.answer}
                </p>
              )}
            </div>

            {/* Category and Order - Two Column Layout */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Category */}
              <div className="flex flex-col">
                <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaList className="text-blue-500" />
                  Category
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`rounded-lg border-2 ${
                    formErrors.category
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                  } bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all duration-200 focus:ring-4`}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {formErrors.category && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {formErrors.category}
                  </p>
                )}
              </div>

              {/* Order */}
              <div className="flex flex-col">
                <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaSort className="text-blue-500" />
                  Display Order
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="1"
                  placeholder="1"
                  className={`rounded-lg border-2 ${
                    formErrors.order
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-blue-100 focus:border-blue-500 focus:ring-blue-200"
                  } bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4`}
                  required
                />
                {formErrors.order && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {formErrors.order}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                Status
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={formData.status === "published"}
                    onChange={handleChange}
                    className="h-4 w-4 cursor-pointer border-blue-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === "draft"}
                    onChange={handleChange}
                    className="h-4 w-4 cursor-pointer border-blue-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Draft</span>
                </label>
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3">
              <div className="flex gap-2">
                <div className="text-sm text-blue-500">ℹ️</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">
                    FAQs with lower order numbers will appear first. Published
                    FAQs will be visible to customers immediately.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer - Buttons */}
        <div className="flex flex-col-reverse gap-2 border-t border-blue-100 bg-gray-50 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/40 sm:w-auto"
          >
            <FaQuestionCircle />
            Create FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFaqsForm;
