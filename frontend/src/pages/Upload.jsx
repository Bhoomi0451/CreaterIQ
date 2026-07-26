

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import UploadBox from "../components/UploadBox";
import FilePreview from "../components/FilePreview";
import ProgressLoader from "../components/ProgressLoader";
import api from "../services/api";

const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Select File
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError("");
  };

  // Remove File
  const handleRemove = () => {
    setSelectedFile(null);
    setError("");
  };

  // Upload File & Trigger AI Analysis
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const contentType = selectedFile.type.startsWith("image/")
        ? "image"
        : selectedFile.type.startsWith("audio/")
        ? "audio"
        : "video";

      // 1) Post upload metadata to backend
      const uploadRes = await api.post("/api/uploads", {
        title: selectedFile.name,
        contentType: contentType,
        status: "pending",
      });

      const upload = uploadRes.data?.data?.upload;
      if (!upload || !upload._id) {
        throw new Error("Failed to create upload record.");
      }

      // 2) Trigger analysis immediately
      await api.post(`/api/analysis/${upload._id}`);

      alert("AI Analysis Completed Successfully 🚀");
      navigate(`/analysis?id=${upload._id}`);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "AI Analysis failed. Please try again.");
    } finally {
      setUploading(false);
    }
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

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 font-medium">
          ⚠️ {error}
        </div>
      )}

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
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
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
