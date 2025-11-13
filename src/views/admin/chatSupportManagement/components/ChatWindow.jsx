import React from "react";
import {
  FaPaperPlane,
  FaUser,
  FaEllipsisV,
  FaCheck,
  FaCheckDouble,
  FaRobot,
} from "react-icons/fa";

const ChatWindow = ({
  selectedChat,
  message,
  onMessageChange,
  onSendMessage,
  onUpdateStatus,
  onUpdatePriority,
  messageEndRef,
}) => {
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex h-[calc(100vh-500px)] min-h-[400px] items-center justify-center rounded-xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50 lg:h-[calc(100vh-400px)]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 sm:h-20 sm:w-20">
            <FaUser className="text-2xl text-blue-600 sm:text-3xl" />
          </div>
          <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
            No Chat Selected
          </h3>
          <p className="text-xs text-gray-500 sm:text-sm">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-500px)] min-h-[400px] flex-col rounded-xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50 lg:h-[calc(100vh-400px)]">
      {/* Chat Header */}
      <div className="border-b border-blue-100 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={selectedChat.userAvatar}
              alt={selectedChat.userName}
              className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
            />
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                {selectedChat.userName}
              </h3>
              <p className="truncate text-xs text-gray-500">
                {selectedChat.userEmail}
              </p>
            </div>
          </div>

          {/* Actions Dropdown */}
          <div className="relative flex items-center gap-2">
            {/* Status Selector */}
            <select
              value={selectedChat.status}
              onChange={(e) => onUpdateStatus(selectedChat._id, e.target.value)}
              className="rounded-lg border-2 border-blue-100 bg-white px-2 py-1 text-xs font-medium outline-none transition-all hover:border-blue-300 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>

            {/* Priority Selector */}
            <select
              value={selectedChat.priority}
              onChange={(e) =>
                onUpdatePriority(selectedChat._id, e.target.value)
              }
              className="rounded-lg border-2 border-blue-100 bg-white px-2 py-1 text-xs font-medium outline-none transition-all hover:border-blue-300 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div className="mt-2 rounded-lg bg-blue-50 px-3 py-2">
          <p className="text-xs font-medium text-gray-600 sm:text-sm">
            Subject:{" "}
            <span className="text-gray-800">{selectedChat.subject}</span>
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {selectedChat.messages.map((msg, idx) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`group relative max-w-[85%] sm:max-w-[75%] ${
                  msg.sender === "admin" ? "items-end" : "items-start"
                } flex flex-col`}
              >
                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
                    msg.sender === "admin"
                      ? "rounded-br-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "rounded-bl-sm bg-gray-100 text-gray-800"
                  }`}
                >
                  {/* Sender Label */}
                  <div className="mb-1 flex items-center gap-2">
                    {msg.sender === "admin" ? (
                      <FaRobot className="text-xs" />
                    ) : (
                      <FaUser className="text-xs" />
                    )}
                    <span className="text-xs font-semibold">
                      {msg.sender === "admin"
                        ? "Support Team"
                        : selectedChat.userName}
                    </span>
                  </div>

                  {/* Message Text */}
                  <p className="break-words text-sm leading-relaxed">
                    {msg.text}
                  </p>
                </div>

                {/* Time and Read Status */}
                <div
                  className={`mt-1 flex items-center gap-1 text-xs text-gray-500 ${
                    msg.sender === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span>{formatMessageTime(msg.timestamp)}</span>
                  {msg.sender === "admin" && (
                    <>
                      {msg.isRead ? (
                        <FaCheckDouble className="text-blue-500" />
                      ) : (
                        <FaCheck className="text-gray-400" />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-blue-100 p-3 sm:p-4">
        <div className="flex items-end gap-2 sm:gap-3">
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows="2"
            className="flex-1 resize-none rounded-lg border-2 border-blue-100 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={onSendMessage}
            disabled={!message.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12"
          >
            <FaPaperPlane className="text-sm sm:text-base" />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
