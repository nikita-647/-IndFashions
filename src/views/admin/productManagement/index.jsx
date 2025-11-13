import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaSync } from "react-icons/fa";
import toast from "react-hot-toast";
import ProductStats from "./components/ProductStats";
import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";
import ProductViewModal from "./components/ProductViewModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    outOfStock: 0,
    lowStock: 0,
    totalValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    priceRange: "all",
    sortBy: "newest",
  });

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products on mount and filter change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Calculate stats whenever products change
  useEffect(() => {
    calculateStats();
  }, [products]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // Simulate API call - Replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(getMockProducts());
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      setProducts(getMockProducts());
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = () => {
    const total = products.length;
    const active = products.filter((p) => p.stock > 0).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    const lowStock = products.filter(
      (p) => p.stock > 0 && p.stock <= 10
    ).length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

    setStats({
      total,
      active,
      outOfStock,
      lowStock,
      totalValue,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProducts();
    setIsRefreshing(false);
    toast.success("Products refreshed successfully");
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      priceRange: "all",
      sortBy: "newest",
    });
    setSearchTerm("");
  };

  const handleAddProduct = (newProduct) => {
    const product = {
      ...newProduct,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [product, ...prev]);
    toast.success("Product added successfully");
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
    toast.success("Product updated successfully");
  };

  const handleDeleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p._id !== selectedProduct._id));
    setShowDeleteModal(false);
    setSelectedProduct(null);
    toast.success("Product deleted successfully");
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // Mock data
  const getMockProducts = () => {
    return [
      {
        _id: "1",
        name: "Cotton Kurti - Blue Floral",
        sku: "IND-KUR-001",
        category: "Women",
        brand: "IndFashions",
        price: 1299,
        stock: 45,
        size: "M, L, XL",
        color: "Blue",
        image: "https://via.placeholder.com/150",
        description:
          "Beautiful blue floral cotton kurti perfect for daily wear",
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        _id: "2",
        name: "Silk Saree - Traditional Red",
        sku: "IND-SAR-002",
        category: "Women",
        brand: "IndFashions",
        price: 4599,
        stock: 0,
        size: "Free Size",
        color: "Red",
        image: "https://via.placeholder.com/150",
        description: "Elegant red silk saree for special occasions",
        createdAt: "2024-02-20T14:20:00Z",
      },
      {
        _id: "3",
        name: "Designer Lehenga - Pink",
        sku: "IND-LEH-003",
        category: "Women",
        brand: "IndFashions",
        price: 8999,
        stock: 8,
        size: "S, M, L",
        color: "Pink",
        image: "https://via.placeholder.com/150",
        description: "Stunning pink designer lehenga for weddings",
        createdAt: "2024-03-18T16:45:00Z",
      },
      {
        _id: "4",
        name: "Formal Kurta Set - White",
        sku: "IND-KUR-004",
        category: "Women",
        brand: "IndFashions",
        price: 2499,
        stock: 30,
        size: "M, L, XL, XXL",
        color: "White",
        image: "https://via.placeholder.com/150",
        description: "Classic white formal kurta set for men",
        createdAt: "2024-04-22T11:15:00Z",
      },
      {
        _id: "5",
        name: "Embroidered Dupatta - Golden",
        sku: "IND-DUP-005",
        category: "Women",
        brand: "IndFashions",
        price: 899,
        stock: 60,
        size: "Free Size",
        color: "Golden",
        image: "https://via.placeholder.com/150",
        description: "Beautiful golden embroidered dupatta",
        createdAt: "2024-05-19T13:30:00Z",
      },
      {
        _id: "6",
        name: "Palazzo Set - Navy Blue",
        sku: "IND-PAL-006",
        category: "Women",
        brand: "IndFashions",
        price: 1799,
        stock: 25,
        size: "S, M, L, XL",
        color: "Navy Blue",
        image: "https://via.placeholder.com/150",
        description: "Comfortable navy blue palazzo set",
        createdAt: "2024-06-21T09:00:00Z",
      },
    ];
  };

  // Filter and search products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filters.category === "all" || product.category === filters.category;

    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "in-stock" && product.stock > 0) ||
      (filters.status === "out-of-stock" && product.stock === 0) ||
      (filters.status === "low-stock" &&
        product.stock > 0 &&
        product.stock <= 10);

    const matchesPriceRange =
      filters.priceRange === "all" ||
      (filters.priceRange === "0-1000" && product.price < 1000) ||
      (filters.priceRange === "1000-3000" &&
        product.price >= 1000 &&
        product.price < 3000) ||
      (filters.priceRange === "3000-5000" &&
        product.price >= 3000 &&
        product.price < 5000) ||
      (filters.priceRange === "5000+" && product.price >= 5000);

    return (
      matchesSearch && matchesCategory && matchesStatus && matchesPriceRange
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header Container */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        {/* Title and Actions */}
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Page Title */}
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl xl:text-4xl">
              Product Management
            </h1>
            <p className="text-xs text-gray-600 sm:text-sm">
              Manage your fashion inventory
            </p>
          </div>

          {/* Actions Container */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-48 md:w-56 lg:w-64 xl:w-72">
              <input
                type="text"
                placeholder="Search products..."
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

            {/* Add Product Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/40 sm:w-auto sm:px-5 sm:py-2.5"
            >
              <FaPlus className="text-sm" />
              <span className="whitespace-nowrap text-xs sm:text-sm">
                Add Product
              </span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <ProductStats stats={stats} isLoading={isLoading} />
      </div>

      {/* Filters */}
      <div className="mb-4 sm:mb-6">
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Product Table */}
      <ProductTable
        products={filteredProducts}
        isLoading={isLoading}
        onView={handleViewProduct}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}

      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onUpdate={handleEditProduct}
        />
      )}

      {showViewModal && selectedProduct && (
        <ProductViewModal
          isOpen={showViewModal}
          product={selectedProduct}
          onClose={() => {
            setShowViewModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {showDeleteModal && selectedProduct && (
        <DeleteConfirmModal
          product={selectedProduct}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductManagement;
