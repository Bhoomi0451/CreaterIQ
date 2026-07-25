import React from "react";

const ProfileInfo = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

      <div className="flex items-center gap-6">

        <div className="w-28 h-28 rounded-full bg-white text-blue-700 flex items-center justify-center text-5xl font-bold">
          A
        </div>

        <div>

          <h1 className="text-4xl font-bold">
            Amisha Patel
          </h1>

          <p className="text-blue-100 mt-2">
            AI Creator • Tech Educator • Content Strategist
          </p>

          <p className="mt-3">
            📍 India
          </p>

        </div>

      </div>

    </div>
  );
};

export default ProfileInfo;