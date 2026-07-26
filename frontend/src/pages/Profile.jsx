import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Profile = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/dashboard');
        if (response.data?.status === 'success') {
          setStats(response.data.data.stats || {});
        }
      } catch (err) {
        console.error("Failed to load profile stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileStats();
  }, []);

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

          <div className="w-36 h-36 rounded-full bg-blue-600 flex items-center justify-center text-white text-7xl font-bold">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : <FaUserCircle />}
          </div>

          <div className="flex-1">

            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser?.name || "Creator User"}
            </h2>

            <p className="text-gray-600 mt-2 text-sm leading-relaxed max-w-xl">
              {currentUser?.bio || "No bio added yet."}
            </p>

            {currentUser?.niche && (
              <span className="inline-block mt-4 bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full font-medium text-xs">
                Niche: {currentUser.niche} 🚀
              </span>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 break-all">{currentUser?.email || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{currentUser?.phone || "Not Added"}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{currentUser?.country || "Not Added"}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaYoutube className="text-red-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 break-all">{currentUser?.socialLinks?.youtube || "Not Added"}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaInstagram className="text-pink-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 break-all">{currentUser?.socialLinks?.instagram || "Not Added"}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaLinkedin className="text-blue-700 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 break-all">{currentUser?.socialLinks?.linkedin || "Not Added"}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaTwitter className="text-sky-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 break-all">{currentUser?.socialLinks?.twitter || "Not Added"}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaGlobe className="text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 break-all">{currentUser?.socialLinks?.website || "Not Added"}</span>
              </div>

            </div>

            <div className="mt-8 flex gap-4">

              <button 
                onClick={() => window.location.href = "/settings"}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
              >
                Edit Profile
              </button>

              <button 
                onClick={() => window.location.href = "/creator-dna"}
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition cursor-pointer"
              >
                View Creator DNA
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500 font-medium">
            Followers
          </h3>
          <p className="text-lg font-semibold mt-3 text-gray-500">
            Follower count unavailable
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500 font-medium">
            Total Uploads
          </h3>
          <p className="text-4xl font-bold mt-3">
            {loading ? "..." : (stats?.totalUploads || 0)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500 font-medium">
            AI Score
          </h3>
          <p className="text-4xl font-bold mt-3 text-blue-600">
            {loading ? "..." : `${stats?.avgOverallScore || 0}%`}
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default Profile;