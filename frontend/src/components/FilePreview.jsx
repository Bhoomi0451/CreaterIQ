import React from "react";

const FilePreview = ({ file }) => {

  if (!file) return null;


  return (
    <div className="bg-white rounded-xl shadow p-5 mt-5">

      <h3 className="font-bold mb-3">
        File Preview
      </h3>


      <p>
        Name: {file.name}
      </p>


      <p>
        Size: {(file.size / 1024).toFixed(2)} KB
      </p>


      {file.type.startsWith("image") && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="mt-4 w-64 rounded-lg"
        />
      )}


      {file.type.startsWith("video") && (
        <video
          controls
          className="mt-4 w-64 rounded-lg"
        >
          <source src={URL.createObjectURL(file)} />
        </video>
      )}

    </div>
  );
};


export default FilePreview;