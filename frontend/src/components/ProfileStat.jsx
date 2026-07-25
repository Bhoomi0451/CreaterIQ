import React from "react";

const ProfileStat = ({ title, value }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <h1 className="text-3xl font-bold text-blue-600 mt-2">
        {value}
      </h1>

    </div>
  );
};

export default ProfileStat;