

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [script, setScript] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Select File
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    if (!title && file) {
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
    setError("");
  };

  // Remove File
  const handleRemove = () => {
    setSelectedFile(null);
    setError("");
  };

  // Upload File & Trigger AI Analysis
  const handleUpload = async () => {
    if (!title.trim()) {
      setError("Please enter a title for the content.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a description of the content.");
      return;
    }
    if (!caption.trim()) {
      setError("Please enter a caption for the post.");
      return;
    }
    if (!selectedFile) {
      setError("Please upload a media file (image or video) first.");
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

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("caption", caption);
      formData.append("script", script);
      formData.append("contentType", contentType);
      formData.append("file", selectedFile);

      // 1) Post upload to backend
      const uploadRes = await api.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

      {/* Upload Box / File Preview */}

      {!selectedFile ? (
        <UploadBox
          onFileSelect={handleFileSelect}
        />
      ) : (
        <FilePreview
          file={selectedFile}
          onRemove={handleRemove}
        />
      )}

      {/* Content Form Details */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          📝 Content Details
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 Coding Tips for Beginners"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of what the content is about..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Caption <span className="text-red-500">*</span>
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write the post caption / copy..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
              <span>Script <span className="text-gray-400 font-normal">(Optional)</span></span>
              <span className="text-xs text-gray-400 font-normal">Helps with transcript and speech pacing analysis</span>
            </label>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste the full video script or voiceover transcript here..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Analyze Button */}

      <div className="flex justify-center">

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "🤖 Uploading & Analyzing..." : "🤖 Analyze with AI"}
        </button>

      </div>

      {/* Loader */}

      {uploading && (
        <ProgressLoader />
      )}

    </motion.div>
  );
};

export default Upload;
