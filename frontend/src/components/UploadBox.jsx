import React from "react";

const UploadBox = ({ onFileSelect }) => {

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      onFileSelect(file);
    }
  };


  return (
    <div className="border-2 border-dashed border-blue-400 rounded-xl p-10 text-center bg-white">

      <h2 className="text-xl font-bold mb-3">
        Upload Your Content
      </h2>

      <p className="text-gray-500 mb-5">
        Upload image, video, or content file for AI analysis
      </p>


      <label className="cursor-pointer">

        <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
          Choose File
        </div>


        <input
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleChange}
        />

      </label>

    </div>
  );
};

export default UploadBox;