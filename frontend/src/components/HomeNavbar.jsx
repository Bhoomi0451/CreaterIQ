import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const HomeNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <Link
          to="/"
          className="flex items-center gap-3 text-3xl font-bold text-blue-600"
        >
          <FaRobot />
          CreatorIQ
        </Link>

        <div className="hidden md:flex items-center gap-8">

          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          <Link to="/upload" className="hover:text-blue-600">
            Upload
          </Link>

          <Link to="/analysis" className="hover:text-blue-600">
            Analysis
          </Link>

          <Link to="/creator-dna" className="hover:text-blue-600">
            Creator DNA
          </Link>

          <Link to="/brands" className="hover:text-blue-600">
            Brands
          </Link>

        </div>

        <div className="flex gap-3">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default HomeNavbar;