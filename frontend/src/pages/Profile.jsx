import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Profile = () => {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Hero */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">

        <h1 className="text-5xl font-bold">
          👤 My Profile
        </h1>

        <p className="mt-4 text-blue-100 text-lg">
          Manage your creator profile and personal information.
        </p>

      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="w-36 h-36 rounded-full bg-blue-600 flex items-center justify-center text-white text-7xl">
            <FaUserCircle />
          </div>

          <div className="flex-1">

            <h2 className="text-3xl font-bold text-gray-800">
              Amisha Patel
            </h2>

            <p className="text-gray-500 mt-2">
              AI Content Creator
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-8">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600" />
                <span>amisha@email.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-600" />
                <span>+91 9876543210</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>India</span>
              </div>

              <div className="flex items-center gap-3">
                <FaInstagram className="text-pink-600" />
                <span>@creator</span>
              </div>

            </div>

            <div className="mt-8 flex gap-4">

              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                Edit Profile
              </button>

              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition">
                View Portfolio
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500">
            Followers
          </h3>
          <p className="text-4xl font-bold mt-3">
            18.2K
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500">
            Total Uploads
          </h3>
          <p className="text-4xl font-bold mt-3">
            146
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500">
            AI Score
          </h3>
          <p className="text-4xl font-bold mt-3 text-blue-600">
            92%
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default Profile;