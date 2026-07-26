import React from "react";

const ProgressLoader = () => {

  return (
    <div className="mt-5">

      <div className="w-full bg-gray-200 rounded-full h-3">

        <div className="bg-blue-600 h-3 rounded-full w-3/4">
        </div>

      </div>


      <p className="text-center mt-2 text-gray-500">
        Uploading...
      </p>

    </div>
  );
};


export default ProgressLoader;