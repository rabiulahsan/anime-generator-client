import { useState } from "react";
import StepsCard from "../../Shared/StepsCard/StepsCard";

const Upscaling = () => {
  // const [photo, setPhoto] = useState(null);
  // const [preview, setPreview] = useState(null); // For image preview
  // const [loading, setLoading] = useState(false);

  const stepCards = [
    {
      id: 1,
      desc: "Upload the image you want to upscale using our tool.",
      title: "Upload",
    },
    {
      id: 2,
      desc: "Click Upscale to enhance the quality and resolution of your image.",
      title: "Upscale",
    },
    {
      id: 3,
      desc: "Download the upscaled image instantly in high resolution.",
      title: "Download",
    },
  ];

  const [file, setFile] = useState(null);
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUpload = () => {
    // Simulate upload
    setTimeout(() => {
      setUploadedFile(URL.createObjectURL(file)); // Preview the uploaded file
    }, 1000);
  };

  // // Handle file change and set preview
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.size <= 10 * 1024 * 1024) {
  //     setPhoto(file);

  //     // Preview the image before upload using FileReader
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result); // Set the base64 URL for preview
  //     };
  //     reader.readAsDataURL(file); // Convert file to base64 format for display
  //   } else {
  //     alert("File size exceeds 10MB or file type is not supported.");

  //     //todo a sweet alert
  //   }
  // };

  return (
    <>
      <p className="text-center text-slate-600 font-bold text-4xl mb-[3%] mt-[6%]">
        High-Resolution Upscaling
      </p>
      <p className="w-[70%] mx-auto text-center text-slate-400 font-semibold  text-sm leading-7 mb-[6%]">
        Enhance the quality of your images with AI-powered upscaling. Improve
        resolution, sharpen details, and make your images look crisper and more
        professional with just a click.
      </p>
      <div className="mb-[5%]">
        <p className="text-center text-slate-600 font-bold text-2xl mb-[5%] mt-[6%]">
          Steps You Need for Image Upscaling
        </p>
        <div className="flex  justify-center items-center   px-[5%] gap-x-6">
          {stepCards?.map((card) => (
            <StepsCard key={stepCards.id} card={card}></StepsCard>
          ))}
        </div>
      </div>

      {/* for handlng images and upscaling and display them  */}
      <div className="">
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
                className="cursor-pointer text-blue-600 hover:underline"
              >
                Drag and Drop file here or{" "}
                <span className="font-bold">Choose file</span>
              </label>
              <p className="text-gray-500 mt-2">
                Supported formats: PNG, JPG, JPEG,WEBP (Max: 10MB)
              </p>
            </div>
          </div>

          {file && (
            <div className="my-5 mx-auto  text-center">
              <p className="text-sm text-slate-600 mb-5">
                Selected file: <span className="font-bold">{file.name}</span>
              </p>

              <button
                onClick={handleUpload}
                className=" bg-slate-600 font-semibold text-slate-100 px-4 py-2 rounded-md  mx-auto hover:bg-slate-700"
              >
                Upload & Upscale
              </button>
            </div>
          )}

          {/* displaying the output file  */}
          {uploadedFile && (
            <div className="mt-4 text-center">
              <h3 className="text-md font-semibold">
                Upload Image for Upscaling
              </h3>
              <img
                src={uploadedFile}
                alt="Uploaded"
                className="mt-2 w-full h-auto object-cover rounded-md"
              />
              <p className="text-gray-600 mt-2">{file.name}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Upscaling;
