
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaRobot } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Login Successful!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center p-6">

      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* Left */}

        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10">

          <FaRobot className="text-6xl mb-6" />

          <h1 className="text-5xl font-bold">
            CreatorIQ
          </h1>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            AI Powered Creator Intelligence Platform.
          </p>

          <ul className="mt-10 space-y-4 text-blue-100">
            <li>✅ AI Analysis</li>
            <li>✅ Creator DNA</li>
            <li>✅ Brand Matching</li>
            <li>✅ Performance Tracking</li>
          </ul>

        </div>

        {/* Right */}

        <div className="p-10">

          <h2 className="text-4xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400"/>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400"/>

              <input
                type={showPassword ? "text":"password"}
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full border rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
              </button>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Don't have an account?

            <Link
              to="/signup"
              className="text-blue-600 font-semibold ml-2"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;