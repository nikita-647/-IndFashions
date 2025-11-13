import { useState, useEffect } from "react";
import { FaSearch, FaSync } from "react-icons/fa";
import toast from "react-hot-toast";
import ReviewStats from "./components/ReviewStats";
import ReviewFilters from "./components/ReviewFilters";
import ReviewTable from "./components/ReviewTable";
import ReviewDetailsModal from "./components/ReviewDetailsModal";
import reviewService from "./services/reviewServices";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    averageRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    rating: "all",
    startDate: "",
    endDate: "",
  });
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch reviews on mount and filter change
  useEffect(() => {
    fetchReviews();
  }, [filters]);

  // Calculate stats whenever reviews change
  useEffect(() => {
    calculateStats();
  }, [reviews]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const filterParams = {
        search: searchTerm,
        status: filters.status !== "all" ? filters.status : undefined,
        rating: filters.rating !== "all" ? filters.rating : undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      };

      const response = await reviewService.getAllReviews(filterParams);

      if (response.success) {
        setReviews(response.data.reviews || response.data);
      } else {
        setReviews(getMockReviews());
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews. Using sample data.");
      setReviews(getMockReviews());
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = () => {
    const total = reviews.length;
    const approved = reviews.filter((r) => r.status === "approved").length;
    const pending = reviews.filter((r) => r.status === "pending").length;
    const rejected = reviews.filter((r) => r.status === "rejected").length;
    const averageRating =
      total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

    setStats({
      total,
      approved,
      pending,
      rejected,
      averageRating,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchReviews();
    setIsRefreshing(false);
    toast.success("Reviews refreshed successfully");
  };

  const handleSearch = () => {
    fetchReviews();
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: "all",
      rating: "all",
      startDate: "",
      endDate: "",
    });
    setSearchTerm("");
  };

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setShowDetailsModal(true);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      return Promise.resolve();
    } catch (error) {
      console.error("Error deleting review:", error);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      return Promise.resolve();
    }
  };

  const handleUpdateStatus = async (reviewId, status) => {
    try {
      await reviewService.updateReviewStatus(reviewId, status);
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, status } : r))
      );
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating review status:", error);
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, status } : r))
      );
      return Promise.resolve();
    }
  };

  const handleReplyToReview = async (reviewId, replyText) => {
    try {
      await reviewService.replyToReview(reviewId, replyText);
      setReviews((prev) =>
        prev.map((r) =>
          r._id === reviewId
            ? { ...r, adminReply: replyText, repliedAt: new Date() }
            : r
        )
      );
      return Promise.resolve();
    } catch (error) {
      console.error("Error replying to review:", error);
      setReviews((prev) =>
        prev.map((r) =>
          r._id === reviewId
            ? { ...r, adminReply: replyText, repliedAt: new Date() }
            : r
        )
      );
      return Promise.resolve();
    }
  };

  // Mock data for demo
  const getMockReviews = () => {
    return [
      {
        _id: "1",
        userName: "Priya Sharma",
        userEmail: "priya@example.com",
        productName: "Cotton Kurti - Blue Floral",
        productImage: "https://via.placeholder.com/100",
        rating: 5,
        reviewText:
          "Absolutely love this kurti! The fabric is soft and comfortable. Perfect for daily wear. Highly recommend!",
        status: "approved",
        isVerifiedPurchase: true,
        createdAt: "2024-10-15T10:30:00Z",
        adminReply: "Thank you for your wonderful feedback!",
        repliedAt: "2024-10-16T09:00:00Z",
      },
      {
        _id: "2",
        userName: "Rahul Kumar",
        userEmail: "rahul@example.com",
        productName: "Silk Saree - Traditional Red",
        productImage: "https://via.placeholder.com/100",
        rating: 4,
        reviewText:
          "Beautiful saree with elegant design. Quality is good but delivery was slightly delayed.",
        status: "pending",
        isVerifiedPurchase: true,
        createdAt: "2024-10-20T14:20:00Z",
      },
      {
        _id: "3",
        userName: "Ananya Gupta",
        userEmail: "ananya@example.com",
        productName: "Designer Lehenga - Pink",
        productImage: "https://via.placeholder.com/100",
        rating: 5,
        reviewText:
          "Stunning lehenga! Got so many compliments at the wedding. Worth every penny!",
        status: "approved",
        isVerifiedPurchase: true,
        createdAt: "2024-10-18T16:45:00Z",
      },
      {
        _id: "4",
        userName: "Vikram Singh",
        userEmail: "vikram@example.com",
        productName: "Formal Kurta Set - White",
        productImage: "https://via.placeholder.com/100",
        rating: 3,
        reviewText:
          "Product is okay but not as shown in pictures. The color is slightly different.",
        status: "pending",
        isVerifiedPurchase: false,
        createdAt: "2024-10-22T11:15:00Z",
      },
      {
        _id: "5",
        userName: "Neha Patel",
        userEmail: "neha@example.com",
        productName: "Embroidered Dupatta - Golden",
        productImage: "https://via.placeholder.com/100",
        rating: 2,
        reviewText:
          "Very disappointed with the quality. The embroidery work is not up to the mark.",
        status: "rejected",
        isVerifiedPurchase: true,
        createdAt: "2024-10-19T13:30:00Z",
      },
      {
        _id: "6",
        userName: "Kavya Reddy",
        userEmail: "kavya@example.com",
        productName: "Palazzo Set - Navy Blue",
        productImage: "https://via.placeholder.com/100",
        rating: 5,
        reviewText:
          "Perfect fit and excellent quality! The color is exactly as shown. Very satisfied with my purchase.",
        status: "approved",
        isVerifiedPurchase: true,
        createdAt: "2024-10-21T09:00:00Z",
      },
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header Container */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        {/* Title and Actions */}
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Page Title */}
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl xl:text-4xl">
              Review Management
            </h1>
            <p className="text-xs text-gray-600 sm:text-sm">
              Manage customer reviews and ratings
            </p>
          </div>

          {/* Actions Container */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-48 md:w-56 lg:w-64 xl:w-72">
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full rounded-lg border-2 border-blue-100 bg-white px-3 py-2 pr-9 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:py-2.5"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-400 transition-colors hover:text-blue-600"
              >
                <FaSearch className="text-sm" />
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 sm:w-auto sm:px-5 sm:py-2.5"
            >
              <FaSync
                className={`text-sm ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="whitespace-nowrap text-xs sm:text-sm">
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <ReviewStats stats={stats} isLoading={isLoading} />
      </div>

      {/* Filters */}
      <div className="mb-4 sm:mb-6">
        <ReviewFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Review Table - Responsive Container */}
      <div className="w-full">
        <ReviewTable
          reviews={reviews}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
          onDelete={handleDeleteReview}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>

      {/* Review Details Modal */}
      {showDetailsModal && selectedReview && (
        <ReviewDetailsModal
          review={selectedReview}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedReview(null);
          }}
          onReply={handleReplyToReview}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default ReviewManagement;
