import { useState } from "react";
import StepsCard from "../../Shared/StepsCard/StepsCard";
import { IoIosSave } from "react-icons/io";
import ImageUploader from "../../Shared/ImageUploader/ImageUploader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upscaling = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [upscaledImage, setUpscaledImage] = useState(null);

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

  // Initialize toast once in your app

  const showToast = (message, type = "info", position = "top-right") => {
    toast(message, {
      position,
      type,
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        showToast("Please select a png,  jpg or webp file", "error");
        return;
      }
      setPhoto(file);

      // Preview the image before upload using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the base64 URL for preview
      };
      reader.readAsDataURL(file); // Convert file to base64 format for display
    } else {
      showToast(
        "File size exceeds 10MB or file type is not supported.",
        "error"
      );

      //toast
    }
  };

  //processing for the upscaling via clipdrop api

  const handleUpload = async () => {
    if (!photo) {
      showToast("Please select an image.", "error");
      return;
    }

    setLoading(true);

    // Prepare FormData for the API request
    const form = new FormData();
    form.append("image_file", photo); // Append image file
    form.append("target_width", 2048); // Append target width
    form.append("target_height", 2048); // Append target height

    // Use toast.promise and wrap your async function inside
    const upscalePromise = async () => {
      try {
        const response = await fetch(
          "https://clipdrop-api.co/image-upscaling/v1/upscale",
          {
            method: "POST",
            headers: {
              "x-api-key": import.meta.env.VITE_CLIP_DROP_KEY, // Replace with your actual API key
            },
            body: form,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);

        setUpscaledImage(imageUrl);
        return imageUrl; // Success, return the image URL
      } catch (error) {
        console.error("Error during the API request:", error);
        throw error; // Rethrow error to handle it in the toast.promise
      } finally {
        setLoading(false);
      }
    };

    // Show the toast with promise state handling
    toast.promise(
      upscalePromise(),
      {
        pending: "Upscaling in progress...",
        success: "Upscaling completed successfully! 🎉",
        error: "Something went wrong during image processing. 😞",
      },
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  // Function to handle the download
  const handleSaveImage = () => {
    // Create an anchor element
    const link = document.createElement("a");

    // Set the href to the upscaled image URL
    link.href = upscaledImage;

    // Set the download attribute with the file name you want to save as
    link.download = "upscaled-image.png"; // You can change the filename as needed

    // Append the anchor to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the anchor from the document
    document.body.removeChild(link);
  };

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
      <div className="mb-[5%]">
        {/* image uploader  */}
        <ImageUploader
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          photo={photo}
          loading={loading}
          name="Upload & Upscaling"
          loadingName="Upscaling..."
        ></ImageUploader>

        {/* displaying the output file  */}
        <div className="flex justify-around items-center mt-10">
          {preview && upscaledImage && (
            <div className="">
              <h3 className="text-md font-semibold text-slate-600 text-center mb-5">
                Before Upscaling
              </h3>
              <img
                src={preview}
                alt="Uploaded"
                className=" object-contain rounded-md w-[400px] h-[400px]"
              />
            </div>
          )}
          {upscaledImage && (
            <div className="">
              <h3 className="text-md font-semibold text-slate-600 text-center mb-5">
                After Upscaling
              </h3>
              <img
                src={upscaledImage}
                alt="Upscaled"
                className="object-contain rounded-md w-[400px] h-[400px]"
              />
            </div>
          )}
        </div>
        {upscaledImage && (
          <button
            onClick={handleSaveImage}
            className="flex items-center gap-x-2 bg-slate-600 font-semibold text-slate-100 px-5 py-3 mt-10 rounded-md  mx-auto hover:bg-slate-700"
          >
            Save Upscaled Image{" "}
            <span className="text-white text-xl">
              <IoIosSave></IoIosSave>
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export default Upscaling;
