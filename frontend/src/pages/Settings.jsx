

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserCog,
  FaBell,
  FaMoon,
  FaShieldAlt,
  FaSave,
  FaShareAlt,
  FaLock,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

const Settings = () => {
  const { currentUser, loadCurrentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [niche, setNiche] = useState("");

  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("Public");
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
      setBio(currentUser.bio || "");
      setCountry(currentUser.country || "");
      setNiche(currentUser.niche || "");

      const links = currentUser.socialLinks || {};
      setYoutube(links.youtube || "");
      setInstagram(links.instagram || "");
      setLinkedin(links.linkedin || "");
      setTwitter(links.twitter || "");
      setWebsite(links.website || "");
    }

    const savedNotifs = localStorage.getItem("notifications");
    if (savedNotifs !== null) {
      setNotifications(savedNotifs === "true");
    }
  }, [currentUser]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // 1. Update Profile Info
      const profileData = {
        name,
        email,
        phone,
        country,
        bio,
        niche,
        socialLinks: {
          youtube,
          instagram,
          linkedin,
          twitter,
          website,
        },
      };

      await api.put("/api/auth/profile", profileData);

      // 2. Update Password if typed
      if (currentPassword || newPassword || confirmPassword) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          setError("All password fields must be filled to change password.");
          setSaving(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          setError("New password and confirm password do not match.");
          setSaving(false);
          return;
        }
        if (newPassword.length < 8) {
          setError("New password must be at least 8 characters long.");
          setSaving(false);
          return;
        }
        await api.put("/api/auth/password", { currentPassword, newPassword });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }

      // Save notification pref to localStorage
      localStorage.setItem("notifications", notifications.toString());

      // Reload Context Details
      await loadCurrentUser();

      setSuccess("Settings updated successfully!");
      alert("✅ Settings Saved Successfully!");
    } catch (err) {
      console.error("Save settings error:", err);
      setError(err.response?.data?.message || "Failed to save settings. Verify input parameters.");
    } finally {
      setSaving(false);
    }
  };

  const handlePrivacy = () => {
    setPrivacy(prev => (prev === "Public" ? "Private" : "Public"));
  };

  const darkMode = theme === "dark";

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Hero */}

      <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-700 rounded-3xl p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold">⚙️ Settings</h1>
        <p className="mt-3 text-gray-200">
          Manage your CreatorIQ profile details and application preferences.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 font-medium">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl text-green-700 font-medium">
          🎉 {success}
        </div>
      )}

      {/* Profile Settings */}

      <div className="bg-white rounded-3xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaUserCog className="text-blue-600 text-3xl" />
          <h2 className="text-2xl font-bold">Profile Details</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Phone/Mobile Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. India"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Niche/Category</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Tech Reviews, Gaming"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">Bio / Biography</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell your audience about yourself..."
              rows="3"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Social Handles */}

      <div className="bg-white rounded-3xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaShareAlt className="text-purple-600 text-3xl" />
          <h2 className="text-2xl font-bold">Social Media Profiles</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">YouTube Channel URL</label>
            <input
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="https://youtube.com/c/yourchannel"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Instagram Handle URL</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/yourhandle"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">LinkedIn Profile URL</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Twitter/X Profile URL</label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://x.com/yourhandle"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">Website URL</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Change Password */}

      <div className="bg-white rounded-3xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaLock className="text-red-500 text-3xl" />
          <h2 className="text-2xl font-bold">Change Password</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Preferences & Theme */}

      <div className="bg-white rounded-3xl shadow-md p-8 space-y-8">
        
        {/* Notifications */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <FaBell className="text-yellow-500 text-2xl" />
            <div>
              <h3 className="font-bold text-gray-800">Notifications</h3>
              <p className="text-gray-500 text-sm">Receive email and in-app system updates</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Dark Mode Theme */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <FaMoon className="text-indigo-600 text-2xl" />
            <div>
              <h3 className="font-bold text-gray-800">Dark Mode</h3>
              <p className="text-gray-500 text-sm">Change theme display settings</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Privacy */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <FaShieldAlt className="text-green-600 text-2xl" />
            <div>
              <h3 className="font-bold text-gray-800">Privacy Status</h3>
              <p className="text-gray-500 text-sm">Current visibility: {privacy}</p>
            </div>
          </div>
          <button
            onClick={handlePrivacy}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg cursor-pointer transition font-medium"
          >
            Toggle Status
          </button>
        </div>

      </div>

      {/* Save Button */}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:scale-105 transition disabled:opacity-50 cursor-pointer shadow-md"
        >
          <FaSave />
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>

    </motion.div>
  );
};

export default Settings;