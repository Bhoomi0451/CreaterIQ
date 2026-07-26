// function StatCard({ title, value, color }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h3 className="text-gray-500 text-sm">{title}</h3>

//       <p className={`text-3xl font-bold mt-2 ${color}`}>
//         {value}
//       </p>
//     </div>
//   );
// }

// export default StatCard;

import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;