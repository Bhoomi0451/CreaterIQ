

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserCog,
  FaBell,
  FaMoon,
  FaShieldAlt,
  FaSave,
} from "react-icons/fa";

const Settings = () => {
  const [name, setName] = useState("Amisha Patel");
  const [email, setEmail] = useState("amisha@example.com");
  const [phone, setPhone] = useState("+91 9876543210");

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [privacy, setPrivacy] = useState("Public");

  const handleSave = () => {
    alert("✅ Settings Saved Successfully!");
  };

  const handleEdit = () => {
    alert("You can edit your profile information below.");
  };

  const handlePrivacy = () => {
    if (privacy === "Public") {
      setPrivacy("Private");
    } else {
      setPrivacy("Public");
    }
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Hero */}

      <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-700 rounded-3xl p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold">⚙️ Settings</h1>

        <p className="mt-3 text-gray-200">
          Manage your CreatorIQ preferences.
        </p>
      </div>

      {/* Profile */}

      <div className="bg-white rounded-3xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-3">
            <FaUserCog className="text-blue-600 text-3xl" />

            <h2 className="text-2xl font-bold">
              Profile Settings
            </h2>
          </div>

          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Edit
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

      </div>

      {/* Preferences */}

      <div className="bg-white rounded-3xl shadow-md p-8 space-y-8">

        {/* Notifications */}

        <div className="flex justify-between items-center">

          <div className="flex gap-3 items-center">

            <FaBell className="text-yellow-500 text-2xl" />

            <div>

              <h3 className="font-bold">
                Notifications
              </h3>

              <p className="text-gray-500 text-sm">
                Receive AI updates and reports
              </p>

            </div>

          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(!notifications)
            }
            className="w-5 h-5"
          />

        </div>

        {/* Dark Mode */}

        <div className="flex justify-between items-center">

          <div className="flex gap-3 items-center">

            <FaMoon className="text-indigo-600 text-2xl" />

            <div>

              <h3 className="font-bold">
                Dark Mode
              </h3>

              <p className="text-gray-500 text-sm">
                UI demo only
              </p>

            </div>

          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
            className="w-5 h-5"
          />

        </div>

        {/* Privacy */}

        <div className="flex justify-between items-center">

          <div className="flex gap-3 items-center">

            <FaShieldAlt className="text-green-600 text-2xl" />

            <div>

              <h3 className="font-bold">
                Privacy
              </h3>

              <p className="text-gray-500 text-sm">
                Current: {privacy}
              </p>

            </div>

          </div>

          <button
            onClick={handlePrivacy}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg"
          >
            Toggle
          </button>

        </div>

      </div>

      {/* Summary */}

      <div className="bg-blue-50 rounded-3xl p-6">

        <h2 className="font-bold text-xl mb-4">
          Current Settings
        </h2>

        <div className="space-y-2 text-gray-700">

          <p><strong>Name:</strong> {name}</p>

          <p><strong>Email:</strong> {email}</p>

          <p><strong>Phone:</strong> {phone}</p>

          <p>
            <strong>Notifications:</strong>{" "}
            {notifications ? "Enabled" : "Disabled"}
          </p>

          <p>
            <strong>Dark Mode:</strong>{" "}
            {darkMode ? "Enabled" : "Disabled"}
          </p>

          <p>
            <strong>Privacy:</strong> {privacy}
          </p>

        </div>

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:scale-105 transition"
        >
          <FaSave />
          Save Changes
        </button>

      </div>

    </motion.div>
  );
};

export default Settings;