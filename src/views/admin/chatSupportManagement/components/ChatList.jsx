import React from "react";
import { FaCircle, FaComments } from "react-icons/fa";

const ChatList = ({ chats, isLoading, selectedChat, onSelectChat }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-orange-500";
      case "resolved":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 border-red-200";
      case "medium":
        return "text-orange-600 bg-orange-100 border-orange-200";
      case "low":
        return "text-blue-600 bg-blue-100 border-blue-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-blue-100 bg-white p-3 shadow-lg shadow-blue-100/50 sm:p-4">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-base font-bold text-gray-800 sm:text-lg">
            Conversations
          </h2>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="h-20 animate-pulse rounded-lg bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50">
      {/* Header */}
      <div className="border-b border-blue-100 p-3 sm:p-4">
        <h2 className="text-base font-bold text-gray-800 sm:text-lg">
          Conversations
        </h2>
        <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
          {chats.length} chat{chats.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Chat List */}
      <div className="max-h-[calc(100vh-500px)] min-h-[400px] overflow-y-auto lg:max-h-[calc(100vh-400px)]">
        {chats.length ? (
          <div className="divide-y divide-blue-50">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => onSelectChat(chat)}
                className={`cursor-pointer p-3 transition-all duration-200 hover:bg-blue-50 sm:p-4 ${
                  selectedChat?._id === chat._id
                    ? "border-l-4 border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={chat.userAvatar}
                      alt={chat.userName}
                      className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
                    />
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                        chat.status
                      )}`}
                    ></div>
                  </div>

                  {/* Chat Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-gray-800">
                          {chat.userName}
                        </h3>
                        <p className="truncate text-xs text-gray-500">
                          {chat.subject}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-gray-500">
                        {formatTime(chat.lastMessageTime)}
                      </span>
                    </div>

                    <p className="mb-2 line-clamp-1 text-xs text-gray-600">
                      {chat.lastMessage}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${getPriorityColor(
                          chat.priority
                        )}`}
                      >
                        {chat.priority}
                      </span>
                      {chat.unreadCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
            <FaComments className="text-4xl text-blue-200" />
            <p className="text-sm font-medium">No chats found</p>
            <p className="text-xs text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
