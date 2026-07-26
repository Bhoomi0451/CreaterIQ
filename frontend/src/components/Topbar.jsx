
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaUpload,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Topbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/api/notifications');
      setNotifications(res.data?.data?.notifications || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
      // Poll notifications every 8 seconds for a real-time live feel
      const interval = setInterval(fetchNotifications, 8000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/api/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put('/api/notifications/mark-all-read');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  const handleClearAll = async () => {
    try {
      await api.delete('/api/notifications/clear');
      setNotifications([]);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-8 py-4 relative">

      <div className="flex justify-between items-center">

        {/* Left */}

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-1">
            Manage your creator journey with AI insights.
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="relative hidden lg:block">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-72 pl-11 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Notification Bell with Dropdown */}

          <div className="relative">

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-11 h-11 rounded-full bg-gray-100 hover:bg-blue-100 transition flex items-center justify-center cursor-pointer"
            >

              <FaBell className="text-gray-700" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}

            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 py-4 z-50">
                
                <div className="flex justify-between items-center px-4 pb-3 border-b">
                  <h3 className="font-bold text-gray-800">Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-xs text-blue-600 hover:underline cursor-pointer font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-[260px] overflow-y-auto divide-y">
                  {notifications.length === 0 ? (
                    <p className="text-center py-8 text-sm text-gray-500">No alerts yet 🔔</p>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => handleMarkAsRead(item._id)}
                        className={`p-4 hover:bg-slate-50 cursor-pointer transition flex flex-col gap-1 ${
                          !item.isRead ? "bg-blue-50/40 font-medium" : ""
                        }`}
                      >
                        <p className="text-xs text-gray-800 leading-snug">
                          {item.message}
                        </p>
                        <span className="text-[9px] text-gray-400">
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="pt-3 px-4 border-t flex justify-center">
                    <button
                      onClick={handleClearAll}
                      className="text-xs text-red-500 hover:underline font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Upload */}

          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:opacity-90 transition shadow-md cursor-pointer"
          >

            <FaUpload />

            Upload

          </button>

          {/* Profile */}

          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 cursor-pointer"
          >

            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">

              <FaUserCircle />

            </div>

            <div className="hidden xl:block">

              <h4 className="font-semibold">
                {currentUser?.name || "User"}
              </h4>

              <p className="text-sm text-gray-500">
                Creator
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;