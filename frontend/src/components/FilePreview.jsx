import React from "react";
import {
  FaFileImage,
  FaFileVideo,
  FaTrash,
} from "react-icons/fa";

const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  const isImage = file.type.startsWith("image");
  const isVideo = file.type.startsWith("video");

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mt-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          File Preview
        </h2>

        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 transition"
        >
          <FaTrash size={20} />
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Preview */}

        <div className="flex justify-center items-center bg-gray-100 rounded-2xl p-4 min-h-[250px]">

          {isImage && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="rounded-xl max-h-72 object-contain"
            />
          )}

          {isVideo && (
            <video
              controls
              className="rounded-xl max-h-72"
            >
              <source src={URL.createObjectURL(file)} />
            </video>
          )}

        </div>

        {/* File Details */}

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            {isImage ? (
              <FaFileImage className="text-blue-600 text-4xl" />
            ) : (
              <FaFileVideo className="text-red-600 text-4xl" />
            )}

            <div>

              <h3 className="text-xl font-semibold">
                {file.name}
              </h3>

              <p className="text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>

            </div>

          </div>

          <div className="bg-blue-50 rounded-2xl p-5 space-y-3">

            <p>
              <strong>Type:</strong> {file.type}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>

            <p>
              <strong>Status:</strong>
              <span className="text-green-600 font-semibold ml-2">
                Ready for AI Analysis
              </span>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FilePreview;