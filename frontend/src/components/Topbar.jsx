
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaUpload,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-8 py-4">

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

          {/* Notification */}

          <button className="relative w-11 h-11 rounded-full bg-gray-100 hover:bg-blue-100 transition flex items-center justify-center">

            <FaBell className="text-gray-700" />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>

          </button>

          {/* Upload */}

          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:opacity-90 transition shadow-md"
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
                Amisha Patel
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