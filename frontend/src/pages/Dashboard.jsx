import React from "react";
import PerformanceChart from "../components/PerformanceChart";
import AISuggestions from "../components/AISuggestions";
import RecentAnalysis from "../components/RecentAnalysis";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">

        <h1 className="text-2xl font-bold mb-8">
          CreatorIQ
        </h1>

        <nav className="space-y-5">

          <a className="block hover:text-blue-400 cursor-pointer">
            Dashboard
          </a>

          <a className="block hover:text-blue-400 cursor-pointer">
            Analytics
          </a>

          <a className="block hover:text-blue-400 cursor-pointer">
            AI Suggestions
          </a>

          <a className="block hover:text-blue-400 cursor-pointer">
            Reports
          </a>

          <a className="block hover:text-blue-400 cursor-pointer">
            Settings
          </a>

        </nav>

      </aside>


      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-3xl font-bold">
              Dashboard
            </h2>

            <p className="text-gray-500">
              Welcome back 👋 Track your creator growth.
            </p>
          </div>


          <div className="flex items-center gap-4">

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Upload Content
            </button>

            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              A
            </div>

          </div>

        </div>



        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">
              Creator Score
            </h3>

            <p className="text-3xl font-bold mt-2">
              85
            </p>
          </div>



          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">
              Virality Score
            </h3>

            <p className="text-3xl font-bold mt-2">
              78%
            </p>
          </div>



          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">
              Brand Matches
            </h3>

            <p className="text-3xl font-bold mt-2">
              12
            </p>
          </div>



          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">
              Reports
            </h3>

            <p className="text-3xl font-bold mt-2">
              25
            </p>
          </div>


        </div>



        {/* Performance Chart */}
        <PerformanceChart />
        <AISuggestions />
        <RecentAnalysis />


      </main>

    </div>
  );
};


export default Dashboard;