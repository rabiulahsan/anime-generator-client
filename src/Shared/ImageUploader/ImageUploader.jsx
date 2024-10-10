import { useState } from "react";

/* eslint-disable react/prop-types */
const ImageUploader = ({
  handleFileChange,
  handleUpload,
  photo,
  loading,
  loadingName,
  name,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(true); // Set drag state to true when the file is dragged over the drop area
  };

  // Handle drag leave event (when the user moves the dragged file outside the drop area)
  const handleDragLeave = () => {
    setIsDragging(false); // Reset the drag state
  };

  // Handle drop event (when the file is dropped in the drop area)
  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(false); // Reset the drag state

    // Access the dropped files
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileChange({ target: { files } }); // Manually trigger file change event
    }
  };

  return (
    <div className="p-6 rounded-lg w-[50%] mx-auto">
      <h2 className="text-2xl font-bold text-center text-slate-600 mb-4">
        Upload File
      </h2>
      {/* Drag-and-drop area */}
      <div
        className={`border-dashed border-2 rounded-md p-6 text-center h-[220px] flex justify-center items-center 
          ${isDragging ? "border-blue-500 bg-blue-100" : "border-slate-300"}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept="image/*"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-sky-500 hover:underline"
          >
            {isDragging
              ? "Drop your file here..."
              : "Drag and Drop file here or "}
            <span className="font-bold">Choose file</span>
          </label>
          <p className="text-slate-500 text-sm mt-2">
            Supported formats: PNG, JPG, JPEG, WEBP (Max: 10MB)
          </p>
        </div>
      </div>

      {/* Show selected photo */}
      {photo && (
        <div className="my-5 mx-auto text-center">
          <p className="text-sm text-slate-600 mb-5">
            Selected file: <span className="font-bold">{photo?.name}</span>
          </p>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`flex items-center gap-x-2 font-semibold text-slate-100 px-5 py-3 mt-10 rounded-md mx-auto 
              ${
                loading
                  ? "bg-slate-400 hover:bg-slate-400"
                  : "bg-slate-700 hover:bg-slate-800"
              }`}
          >
            {loading ? loadingName : name}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
