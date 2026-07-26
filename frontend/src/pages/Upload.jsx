

import React, { useState } from "react";
import { motion } from "framer-motion";

import UploadBox from "../components/UploadBox";
import FilePreview from "../components/FilePreview";
import ProgressLoader from "../components/ProgressLoader";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Select File
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  // Remove File
  const handleRemove = () => {
    setSelectedFile(null);
  };

  // Upload File
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      alert("AI Analysis Completed Successfully 🚀");
    }, 2500);
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}

      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl">

        <h1 className="text-5xl font-bold">
          📤 Upload Content
        </h1>

        <p className="mt-4 text-lg text-blue-100 max-w-3xl">
          Upload your image or video and let our AI analyze
          engagement, virality, creator score and brand compatibility.
        </p>

      </div>

      {/* Upload Box */}

      <UploadBox
        onFileSelect={handleFileSelect}
      />

      {/* File Preview */}

      {selectedFile && (
        <FilePreview
          file={selectedFile}
          onRemove={handleRemove}
        />
      )}

      {/* Analyze Button */}

      {selectedFile && (
        <div className="flex justify-center">

          <button
            onClick={handleUpload}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition duration-300"
          >
            🤖 Analyze with AI
          </button>

        </div>
      )}

      {/* Loader */}

      {uploading && (
        <ProgressLoader />
      )}

    </motion.div>
  );
};

export default Upload;
