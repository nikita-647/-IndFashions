// OrderManagement/index.jsx
import React, { useState } from "react";
import StatsCards from "./components/StatsCards";
import SearchFilters from "./components/SearchFilters";
import OrderTable from "./components/OrderTable";
import OrderCards from "./components/OrderCards";
import OrderDetailsModal from "./components/OrderDetailsModal";

// Mock Orders Data
const mockOrders = [
  {
    id: "ORD-2024-001",
    customerName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    orderDate: "2024-11-13T10:30:00",
    status: "delivered",
    total: 4599,
    items: [
      {
        name: "Designer Silk Saree",
        sku: "SAR-001",
        qty: 1,
        price: 3499,
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop",
      },
      {
        name: "Embroidered Blouse",
        sku: "BLS-045",
        qty: 1,
        price: 1100,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop",
      },
    ],
    shippingAddress: {
      street: "123 MG Road",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
    },
    paymentMethod: "UPI",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-002",
    customerName: "Rahul Kumar",
    email: "rahul.k@example.com",
    phone: "+91 87654 32109",
    orderDate: "2024-11-13T14:20:00",
    status: "processing",
    total: 5299,
    items: [
      {
        name: "Wedding Lehenga",
        sku: "LEH-012",
        qty: 1,
        price: 5299,
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop",
      },
    ],
    shippingAddress: {
      street: "45 Brigade Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-003",
    customerName: "Anjali Verma",
    email: "anjali.v@example.com",
    phone: "+91 76543 21098",
    orderDate: "2024-11-13T09:15:00",
    status: "pending",
    total: 2199,
    items: [
      {
        name: "Cotton Kurta Set",
        sku: "KUR-008",
        qty: 2,
        price: 999,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop",
      },
      {
        name: "Silk Dupatta",
        sku: "DUP-021",
        qty: 1,
        price: 1200,
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop",
      },
    ],
    shippingAddress: {
      street: "78 Park Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    paymentMethod: "COD",
    paymentStatus: "pending",
  },
  {
    id: "ORD-2024-004",
    customerName: "Neha Singh",
    email: "neha.singh@example.com",
    phone: "+91 65432 10987",
    orderDate: "2024-11-12T16:45:00",
    status: "shipped",
    total: 3799,
    items: [
      {
        name: "Anarkali Suit",
        sku: "ANR-020",
        qty: 1,
        price: 3799,
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop",
      },
    ],
    shippingAddress: {
      street: "12 Connaught Place",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    paymentMethod: "Net Banking",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-005",
    customerName: "Vikram Reddy",
    email: "vikram.r@example.com",
    phone: "+91 54321 09876",
    orderDate: "2024-11-11T18:30:00",
    status: "cancelled",
    total: 1499,
    items: [
      {
        name: "Pashmina Shawl",
        sku: "SHL-003",
        qty: 1,
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop",
      },
    ],
    shippingAddress: {
      street: "56 Anna Salai",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600002",
    },
    paymentMethod: "UPI",
    paymentStatus: "refunded",
  },
  {
    id: "ORD-2024-006",
    customerName: "Meera Patel",
    email: "meera.p@example.com",
    phone: "+91 98123 45678",
    orderDate: "2024-11-13T11:20:00",
    status: "delivered",
    total: 6899,
    items: [
      {
        name: "Banarasi Silk Saree",
        sku: "SAR-089",
        qty: 1,
        price: 6899,
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop",
      },
    ],
    shippingAddress: {
      street: "90 Civil Lines",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001",
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const getStatusStats = () => {
    const totalRevenue = orders.reduce((sum, order) => {
      return order.status !== "cancelled" ? sum + order.total : sum;
    }, 0);

    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      revenue: totalRevenue,
    };
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 shadow-lg shadow-blue-500/30">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                Order Management
              </h1>
              <p className="text-sm text-gray-600 sm:text-base">
                Manage your Indian fashion store orders
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        {/* Orders Display */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-blue-200/50">
          {/* Desktop Table */}
          <OrderTable orders={filteredOrders} onViewOrder={setSelectedOrder} />

          {/* Mobile/Tablet Cards */}
          <OrderCards orders={filteredOrders} onViewOrder={setSelectedOrder} />

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center px-4 py-16">
              <div className="mb-4 rounded-full bg-blue-100 p-6">
                <svg
                  className="h-16 w-16 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-700">
                No orders found
              </h3>
              <p className="text-center text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </div>
  );
};

export default OrderManagement;
