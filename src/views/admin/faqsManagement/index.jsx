// src/views/admin/faqsManagement/index.jsx
import { useState, useEffect } from "react";
import { FaSearch, FaQuestionCircle, FaSync } from "react-icons/fa";
import FaqsTable from "./components/FaqsTable";
import AddFaqsForm from "./components/AddFaqsForm";

const FaqsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateStats = (faqs) => {
    const total = faqs.length;
    const published = faqs.filter((faq) => faq.status === "published").length;
    const draft = faqs.filter((faq) => faq.status === "draft").length;

    setStats({ total, published, draft });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      {/* Header Container */}
      <div className="mb-6 sm:mb-8">
        {/* Title and Actions */}
        <div className="mb-4 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Page Title */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              FAQs Management
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Manage frequently asked questions
            </p>
          </div>

          {/* Actions Container */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Box */}
            <div className="relative w-full sm:w-64 lg:w-72">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border-2 border-blue-100 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400" />
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-500 bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-50 disabled:opacity-50 sm:w-auto"
            >
              <FaSync
                className={`text-base ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="whitespace-nowrap">Refresh</span>
            </button>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/40 sm:w-auto"
            >
              <FaQuestionCircle className="text-base" />
              <span className="whitespace-nowrap">Add FAQ</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total FAQs */}
          <div className="group rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 p-3 transition-all duration-200 group-hover:scale-110">
                <FaQuestionCircle className="text-xl text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Total FAQs
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          {/* Published */}
          <div className="group rounded-xl border border-green-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-green-100 to-green-200 p-3 transition-all duration-200 group-hover:scale-110">
                <div className="text-xl text-green-600">✓</div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Published
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {stats.published}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{
                  width: `${
                    stats.total > 0 ? (stats.published / stats.total) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Draft */}
          <div className="group rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100/50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 p-3 transition-all duration-200 group-hover:scale-110">
                <div className="text-xl text-orange-600">📝</div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  Draft
                </p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {stats.draft}
                </p>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{
                  width: `${
                    stats.total > 0 ? (stats.draft / stats.total) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Table */}
      <FaqsTable searchTerm={searchTerm} updateStats={updateStats} />

      {/* Add Modal */}
      {showAddModal && <AddFaqsForm onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default FaqsManagement;
