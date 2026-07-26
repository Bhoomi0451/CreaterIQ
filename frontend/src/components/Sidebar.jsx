

import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaUpload,
  FaBrain,
  FaDna,
  FaHandshake,
  FaUser,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartLine /> },
    { name: "Upload", path: "/upload", icon: <FaUpload /> },
    { name: "AI Analysis", path: "/analysis", icon: <FaBrain /> },
    { name: "Creator DNA", path: "/creator-dna", icon: <FaDna /> },
    { name: "Brand Match", path: "/brands", icon: <FaHandshake /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Home", path: "/", icon: <FaHome /> },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col justify-between shadow-2xl">

      {/* Logo */}
      <div>

        <div className="p-8 border-b border-slate-700">

          <h1 className="text-3xl font-extrabold text-blue-400">
            CreatorIQ
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            AI Creator Platform
          </p>

        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}

        </nav>

      </div>

      {/* Bottom Card */}
      <div className="p-6">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5">

          <p className="text-sm text-blue-100">
            Creator Score
          </p>

          <h2 className="text-4xl font-bold mt-2">
            92
          </h2>

          <p className="mt-3 text-sm text-blue-100">
            Excellent Performance 🚀
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;