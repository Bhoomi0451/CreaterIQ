import React, { useState } from "react";
import UploadBox from "../components/UploadBox";
import FilePreview from "../components/FilePreview";
import ProgressLoader from "../components/ProgressLoader";


const Upload = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);


  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };


  const handleUpload = () => {

    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }


    setUploading(true);


    setTimeout(() => {
      setUploading(false);
      alert("File uploaded successfully!");
    }, 2000);

  };


  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <h1 className="text-3xl font-bold mb-2">
        Upload Content 📤
      </h1>


      <p className="text-gray-500 mb-8">
        Upload your content and let AI analyze your performance.
      </p>



      <UploadBox 
        onFileSelect={handleFileSelect}
      />



      <FilePreview 
        file={selectedFile}
      />



      {selectedFile && (

        <button
          onClick={handleUpload}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Analyze Content
        </button>

      )}



      {uploading && (
        <ProgressLoader />
      )}



    </div>

  );
};


export default Upload;

