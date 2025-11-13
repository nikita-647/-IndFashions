// src/views/admin/reviewManagement/services/reviewService.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Configure axios with auth header
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Review Service
const reviewService = {
  // Get all reviews with filters
  getAllReviews: async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.status) params.append("status", filters.status);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.productId) params.append("productId", filters.productId);
      if (filters.userId) params.append("userId", filters.userId);
      if (filters.search) params.append("search", filters.search);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);

      const response = await apiClient.get(`/reviews?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single review by ID
  getReviewById: async (reviewId) => {
    try {
      const response = await apiClient.get(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update review status (approve/reject)
  updateReviewStatus: async (reviewId, status) => {
    try {
      const response = await apiClient.patch(`/reviews/${reviewId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete review
  deleteReview: async (reviewId) => {
    try {
      const response = await apiClient.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Reply to review (admin response)
  replyToReview: async (reviewId, replyText) => {
    try {
      const response = await apiClient.post(`/reviews/${reviewId}/reply`, {
        reply: replyText,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get review statistics
  getReviewStats: async () => {
    try {
      const response = await apiClient.get("/reviews/stats");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Mark review as featured (optional)
  toggleFeaturedReview: async (reviewId, featured) => {
    try {
      const response = await apiClient.patch(`/reviews/${reviewId}/featured`, {
        featured,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Report review (spam/inappropriate)
  reportReview: async (reviewId, reason) => {
    try {
      const response = await apiClient.post(`/reviews/${reviewId}/report`, {
        reason,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default reviewService;
