

import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import Profile from "../pages/Profile";
import Analysis from "../pages/Analysis";
import CreatorDNA from "../pages/CreatorDNA";
import Brands from "../pages/Brands";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Pages */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Layout */}

      <Route element={<MainLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/upload"
          element={<Upload />}
        />

        <Route
          path="/analysis"
          element={<Analysis />}
        />

        <Route
          path="/creator-dna"
          element={<CreatorDNA />}
        />

        <Route
          path="/brands"
          element={<Brands />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      {/* 404 */}

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



