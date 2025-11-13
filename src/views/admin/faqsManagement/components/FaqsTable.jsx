// src/views/admin/faqsManagement/components/FaqsTable.jsx
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import toast from "react-hot-toast";
import EditFaqsForm from "./EditFaqsForm";

const FaqsTable = ({ searchTerm = "", updateStats }) => {
  const [faqs, setFaqs] = useState([
    {
      _id: "1",
      question: "What are your shipping charges?",
      answer:
        "We offer free shipping on orders above ₹999. For orders below ₹999, a flat shipping charge of ₹99 applies across India.",
      category: "Shipping",
      status: "published",
      order: 1,
      createdAt: "2024-10-15",
    },
    {
      _id: "2",
      question: "What is your return policy?",
      answer:
        "We have a 7-day easy return policy. Products must be unused and in original packaging with all tags intact. Return shipping is free for defective items.",
      category: "Returns",
      status: "published",
      order: 2,
      createdAt: "2024-10-16",
    },
    {
      _id: "3",
      question: "How long does delivery take?",
      answer:
        "Delivery typically takes 5-7 business days for metro cities and 7-10 business days for other locations. Express delivery is available at additional cost.",
      category: "Shipping",
      status: "published",
      order: 3,
      createdAt: "2024-10-17",
    },
    {
      _id: "4",
      question: "Do you offer Cash on Delivery?",
      answer:
        "Yes, we offer COD facility across India. A nominal charge of ₹50 is applicable for COD orders.",
      category: "Payment",
      status: "draft",
      order: 4,
      createdAt: "2024-10-18",
    },
    {
      _id: "5",
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order from your account dashboard.",
      category: "Orders",
      status: "published",
      order: 5,
      createdAt: "2024-10-19",
    },
  ]);

  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedFaqId, setSelectedFaqId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  useEffect(() => {
    if (updateStats) {
      updateStats(faqs);
    }
  }, [faqs, updateStats]);

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer} ${faq.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === "published"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-orange-100 text-orange-700 border-orange-200";
  };

  const handleDelete = () => {
    toast.success("FAQ deleted successfully");
    setFaqs((prev) => prev.filter((faq) => faq._id !== selectedFaqId));
    setShowDeleteModal(false);
    setSelectedFaqId(null);
  };

  const handleEdit = (faq) => {
    setSelectedFaq(faq);
    setShowEditModal(true);
  };

  const handleUpdateFaq = (updatedFaq) => {
    setFaqs((prev) =>
      prev.map((faq) =>
        faq._id === updatedFaq._id ? { ...faq, ...updatedFaq } : faq
      )
    );
    setShowEditModal(false);
    setSelectedFaq(null);
  };

  const toggleExpand = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="relative rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          FAQs List
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage frequently asked questions
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden overflow-hidden rounded-lg border border-blue-100 lg:block">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-blue-600 text-sm text-white shadow-md">
              <tr>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  #
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Question
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Category
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Status
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Order
                </th>
                <th className="border-b border-blue-400/30 px-4 py-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filteredFaqs.length ? (
                filteredFaqs.map((faq, idx) => (
                  <React.Fragment key={faq._id}>
                    <tr className="transition-all duration-200 hover:bg-blue-50/50">
                      <td className="px-4 py-4 font-medium text-gray-700">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => toggleExpand(faq._id)}
                          className="flex items-center gap-2 text-left transition-colors hover:text-blue-600"
                        >
                          {expandedFaq === faq._id ? (
                            <FaChevronUp className="text-blue-500" />
                          ) : (
                            <FaChevronDown className="text-gray-400" />
                          )}
                          <span className="font-medium text-gray-800">
                            {faq.question}
                          </span>
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {faq.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
                            faq.status
                          )}`}
                        >
                          {faq.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-700">
                        {faq.order}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleEdit(faq)}
                            className="rounded-lg bg-blue-100 p-2.5 text-blue-600 transition-all duration-200 hover:bg-blue-200 hover:shadow-md"
                            title="Edit"
                          >
                            <FaEdit className="text-base" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedFaqId(faq._id);
                              setShowDeleteModal(true);
                            }}
                            className="rounded-lg bg-red-100 p-2.5 text-red-600 transition-all duration-200 hover:bg-red-200 hover:shadow-md"
                            title="Delete"
                          >
                            <FaTrash className="text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedFaq === faq._id && (
                      <tr>
                        <td colSpan="6" className="bg-blue-50/30 px-4 py-4">
                          <div className="rounded-lg border border-blue-100 bg-white p-4">
                            <p className="mb-2 text-sm font-semibold text-gray-700">
                              Answer:
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600">
                              {faq.answer}
                            </p>
                            <p className="mt-3 text-xs text-gray-500">
                              Created on:{" "}
                              {new Date(faq.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="text-5xl text-blue-200">❓</div>
                      <p className="text-base font-medium">No FAQs found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="space-y-4 lg:hidden">
        {filteredFaqs.length ? (
          filteredFaqs.map((faq, idx) => (
            <div
              key={faq._id}
              className="rounded-xl border border-blue-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {/* Card Header */}
              <div
                className="cursor-pointer p-4"
                onClick={() => toggleExpand(faq._id)}
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {idx + 1}
                    </span>
                    {expandedFaq === faq._id ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </div>
                  <span
                    className={`rounded-full border px-3 py-0.5 text-xs font-medium ${getStatusColor(
                      faq.status
                    )}`}
                  >
                    {faq.status}
                  </span>
                </div>

                <h3 className="mb-2 font-semibold text-gray-800">
                  {faq.question}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                    {faq.category}
                  </span>
                  <span>•</span>
                  <span>Order: {faq.order}</span>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedFaq === faq._id && (
                <div className="border-t border-blue-100 bg-blue-50/30 p-4">
                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                  <p className="mb-3 text-xs text-gray-500">
                    Created:{" "}
                    {new Date(faq.createdAt).toLocaleDateString("en-IN")}
                  </p>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(faq);
                      }}
                      className="flex items-center justify-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-200"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFaqId(faq._id);
                        setShowDeleteModal(true);
                      }}
                      className="flex items-center justify-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-200"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
            <div className="text-5xl text-blue-200">❓</div>
            <p className="text-base font-medium">No FAQs found</p>
            <p className="text-sm text-gray-400">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          title="Delete FAQ"
          message="Are you sure you want to delete this FAQ? This action cannot be undone."
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedFaqId(null);
          }}
          onConfirm={handleDelete}
          confirmLabel="Delete"
          confirmClass="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          icon={<FaTrash className="text-xl text-red-500" />}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedFaq && (
        <EditFaqsForm
          faq={selectedFaq}
          onClose={() => {
            setShowEditModal(false);
            setSelectedFaq(null);
          }}
          onUpdate={handleUpdateFaq}
        />
      )}
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({
  title,
  message,
  onCancel,
  onConfirm,
  confirmLabel,
  confirmClass,
  icon,
}) => (
  <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-100 p-3">{icon}</div>
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
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 sm:w-auto"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl sm:w-auto ${confirmClass}`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default FaqsTable;
