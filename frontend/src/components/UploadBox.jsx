
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const UploadBox = ({ onFileSelect }) => {
  const [dragging, setDragging] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-3xl border-2 border-dashed p-12 text-center shadow-lg transition-all duration-300 ${
        dragging
          ? "border-blue-600 bg-blue-50"
          : "border-blue-300 bg-white"
      }`}
    >
      <div className="flex justify-center text-6xl text-blue-600 mb-6">
        <FaCloudUploadAlt />
      </div>

      <h2 className="text-3xl font-bold">
        Drag & Drop Your File
      </h2>

      <p className="text-gray-500 mt-3 mb-8">
        Upload Image, Video or Reel for AI Analysis
      </p>

      <label className="cursor-pointer">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition">
          Choose File
        </span>

        <input
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleChange}
        />
      </label>

      <p className="text-gray-400 mt-6 text-sm">
        or drag and drop your file here
      </p>
    </div>
  );
};

export default UploadBox;