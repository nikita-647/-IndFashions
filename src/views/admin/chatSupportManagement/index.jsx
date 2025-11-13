import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaSync, FaPaperPlane, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import ChatStats from "./components/ChatStats";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import ChatFilters from "./components/ChatFilters";

const ChatSupportManagement = () => {
  const [chats, setChats] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    resolved: 0,
    avgResponseTime: "0m",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    sortBy: "newest",
  });
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, [filters]);

  useEffect(() => {
    calculateStats();
  }, [chats]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setChats(getMockChats());
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Failed to load chats");
      setChats(getMockChats());
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = () => {
    const total = chats.length;
    const active = chats.filter((c) => c.status === "active").length;
    const pending = chats.filter((c) => c.status === "pending").length;
    const resolved = chats.filter((c) => c.status === "resolved").length;

    setStats({
      total,
      active,
      pending,
      resolved,
      avgResponseTime: "2m 30s",
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchChats();
    setIsRefreshing(false);
    toast.success("Chats refreshed successfully");
  };

  const handleSearch = () => {
    fetchChats();
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
      priority: "all",
      sortBy: "newest",
    });
    setSearchTerm("");
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    // Mark as read
    setChats((prev) =>
      prev.map((c) => (c._id === chat._id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      _id: Date.now().toString(),
      sender: "admin",
      text: message,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setChats((prev) =>
      prev.map((c) =>
        c._id === selectedChat._id
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessage: message,
              lastMessageTime: new Date().toISOString(),
            }
          : c
      )
    );

    setSelectedChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    setMessage("");
    toast.success("Message sent");
  };

  const handleUpdateStatus = (chatId, status) => {
    setChats((prev) =>
      prev.map((c) => (c._id === chatId ? { ...c, status } : c))
    );
    if (selectedChat?._id === chatId) {
      setSelectedChat((prev) => ({ ...prev, status }));
    }
    toast.success(`Chat marked as ${status}`);
  };

  const handleUpdatePriority = (chatId, priority) => {
    setChats((prev) =>
      prev.map((c) => (c._id === chatId ? { ...c, priority } : c))
    );
    if (selectedChat?._id === chatId) {
      setSelectedChat((prev) => ({ ...prev, priority }));
    }
    toast.success(`Priority updated to ${priority}`);
  };

  const getMockChats = () => {
    return [
      {
        _id: "1",
        userName: "Priya Sharma",
        userEmail: "priya.sharma@example.com",
        userAvatar:
          "https://ui-avatars.com/api/?name=Priya+Sharma&background=3b82f6&color=fff",
        status: "active",
        priority: "high",
        subject: "Order Delivery Issue",
        lastMessage: "When will my order arrive?",
        lastMessageTime: "2024-11-07T10:30:00Z",
        unreadCount: 2,
        messages: [
          {
            _id: "m1",
            sender: "user",
            text: "Hello, I ordered a saree 5 days ago but haven't received it yet.",
            timestamp: "2024-11-07T10:25:00Z",
            isRead: true,
          },
          {
            _id: "m2",
            sender: "admin",
            text: "Hi Priya! Let me check your order status for you.",
            timestamp: "2024-11-07T10:26:00Z",
            isRead: true,
          },
          {
            _id: "m3",
            sender: "user",
            text: "When will my order arrive?",
            timestamp: "2024-11-07T10:30:00Z",
            isRead: false,
          },
        ],
        createdAt: "2024-11-07T10:25:00Z",
      },
      {
        _id: "2",
        userName: "Rahul Kumar",
        userEmail: "rahul.k@example.com",
        userAvatar:
          "https://ui-avatars.com/api/?name=Rahul+Kumar&background=10b981&color=fff",
        status: "pending",
        priority: "medium",
        subject: "Product Size Exchange",
        lastMessage: "Can I exchange for a larger size?",
        lastMessageTime: "2024-11-07T09:15:00Z",
        unreadCount: 1,
        messages: [
          {
            _id: "m4",
            sender: "user",
            text: "I received my kurta but it's too small. Can I exchange for a larger size?",
            timestamp: "2024-11-07T09:15:00Z",
            isRead: false,
          },
        ],
        createdAt: "2024-11-07T09:15:00Z",
      },
      {
        _id: "3",
        userName: "Ananya Gupta",
        userEmail: "ananya.g@example.com",
        userAvatar:
          "https://ui-avatars.com/api/?name=Ananya+Gupta&background=f59e0b&color=fff",
        status: "resolved",
        priority: "low",
        subject: "Payment Confirmation",
        lastMessage: "Thank you for your help!",
        lastMessageTime: "2024-11-06T16:45:00Z",
        unreadCount: 0,
        messages: [
          {
            _id: "m5",
            sender: "user",
            text: "I made a payment but didn't receive confirmation.",
            timestamp: "2024-11-06T16:30:00Z",
            isRead: true,
          },
          {
            _id: "m6",
            sender: "admin",
            text: "Let me verify your payment details.",
            timestamp: "2024-11-06T16:32:00Z",
            isRead: true,
          },
          {
            _id: "m7",
            sender: "admin",
            text: "Your payment has been confirmed. Order #12345 is being processed.",
            timestamp: "2024-11-06T16:35:00Z",
            isRead: true,
          },
          {
            _id: "m8",
            sender: "user",
            text: "Thank you for your help!",
            timestamp: "2024-11-06T16:45:00Z",
            isRead: true,
          },
        ],
        createdAt: "2024-11-06T16:30:00Z",
      },
      {
        _id: "4",
        userName: "Vikram Singh",
        userEmail: "vikram.s@example.com",
        userAvatar:
          "https://ui-avatars.com/api/?name=Vikram+Singh&background=8b5cf6&color=fff",
        status: "active",
        priority: "high",
        subject: "Refund Request",
        lastMessage: "I want to return my lehenga",
        lastMessageTime: "2024-11-07T11:00:00Z",
        unreadCount: 3,
        messages: [
          {
            _id: "m9",
            sender: "user",
            text: "I want to return my lehenga. The color is not as shown in pictures.",
            timestamp: "2024-11-07T11:00:00Z",
            isRead: false,
          },
        ],
        createdAt: "2024-11-07T11:00:00Z",
      },
      {
        _id: "5",
        userName: "Neha Patel",
        userEmail: "neha.patel@example.com",
        userAvatar:
          "https://ui-avatars.com/api/?name=Neha+Patel&background=ec4899&color=fff",
        status: "pending",
        priority: "low",
        subject: "Product Inquiry",
        lastMessage: "Do you have this in blue color?",
        lastMessageTime: "2024-11-06T14:20:00Z",
        unreadCount: 0,
        messages: [
          {
            _id: "m10",
            sender: "user",
            text: "Do you have this kurti in blue color?",
            timestamp: "2024-11-06T14:20:00Z",
            isRead: true,
          },
        ],
        createdAt: "2024-11-06T14:20:00Z",
      },
    ];
  };

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "all" || chat.status === filters.status;

    const matchesPriority =
      filters.priority === "all" || chat.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
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
              Chat Support Management
            </h1>
            <p className="text-xs text-gray-600 sm:text-sm">
              Manage customer conversations and support tickets
            </p>
          </div>

          {/* Actions Container */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-48 md:w-56 lg:w-64 xl:w-72">
              <input
                type="text"
                placeholder="Search chats..."
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
        <ChatStats stats={stats} isLoading={isLoading} />
      </div>

      {/* Filters */}
      <div className="mb-4 sm:mb-6">
        <ChatFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <ChatList
            chats={filteredChats}
            isLoading={isLoading}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 xl:col-span-3">
          <ChatWindow
            selectedChat={selectedChat}
            message={message}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
            onUpdateStatus={handleUpdateStatus}
            onUpdatePriority={handleUpdatePriority}
            messageEndRef={messageEndRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSupportManagement;
