/* eslint-disable react/prop-types */
const ImageUploader = ({
  handleFileChange,
  handleUpload,
  photo,
  loading,
  loadingName,
  name,
}) => {
  return (
    <div className=" p-6 rounded-lg  w-[50%]  mx-auto">
      <h2 className="text-2xl font-bold text-center text-slate-600 mb-4">
        Upload File
      </h2>
      <div className="border-dashed border-2 border-slate-300 rounded-md p-6 text-center h-[220px] flex justify-center items-center">
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
            Drag and Drop file here or{" "}
            <span className="font-bold">Choose file</span>
          </label>
          <p className="text-slate-500 text-sm mt-2">
            Supported formats: PNG, JPG, JPEG,WEBP (Max: 10MB)
          </p>
        </div>
      </div>

      {photo && (
        <div className="my-5 mx-auto  text-center">
          <p className="text-sm text-slate-600 mb-5">
            Selected file: <span className="font-bold">{photo?.name}</span>
          </p>

          <button
            onClick={handleUpload}
            disabled={loading}
            className=" bg-slate-600 font-semibold text-slate-100 px-4 py-2 rounded-md  mx-auto hover:bg-slate-700"
          >
            {loading ? loadingName : name}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
