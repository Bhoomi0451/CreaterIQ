import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import Profile from "../pages/Profile";
import Analysis from "../pages/Analysis";


const AppRoutes = () => {
  return (
    <Routes>

      {/* Landing Page */}
      <Route 
        path="/" 
        element={<Home />} 
      />


      {/* Authentication */}
      <Route 
        path="/login" 
        element={<Login />} 
      />

      <Route 
        path="/signup" 
        element={<Signup />} 
      />


      {/* Dashboard */}
      <Route 
        path="/dashboard" 
        element={<Dashboard />} 
      />


      {/* Upload Content */}
      <Route 
        path="/upload" 
        element={<Upload />} 
      />


      {/* Profile */}
      <Route 
        path="/profile" 
        element={<Profile />} 
      />
      <Route
  path="/analysis"
  element={<Analysis />}
/>


      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">
              404 - Page Not Found
            </h1>
          </div>
        }
      />

    </Routes>
  );
};


export default AppRoutes;