import { IoIosSave } from "react-icons/io";
import ImageUploader from "../../Shared/ImageUploader/ImageUploader";
import StepsCard from "../../Shared/StepsCard/StepsCard";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Removebg = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [bgRemovedImage, setBgRemovedImage] = useState(null);

  const stepCards = [
    {
      id: 1,
      desc: "Upload the image you want to remove the background from.",
      title: "Upload Image",
    },
    {
      id: 2,
      desc: "Click Remove to erase the background from the uploaded image.",
      title: "Remove Background",
    },
    {
      id: 3,
      desc: "Download the image with the background removed instantly.",
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
        showToast(
          "Please upload an image in PNG, JPEG, or WebP format.",
          "error"
        );
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
    form.append("image_file", photo);

    const removeBgPromise = async () => {
      try {
        const response = await fetch(
          "https://clipdrop-api.co/remove-background/v1",
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

        setBgRemovedImage(imageUrl); // Set the image URL for the background removed image
        return imageUrl;
      } catch (error) {
        console.error("Error during the API request:", error);
        throw error; // Throw error to handle it in toast.promise
      } finally {
        setLoading(false);
      }
    };

    // Use toast.promise to handle different states
    toast.promise(
      removeBgPromise(),
      {
        pending: "Removing background...",
        success: "Background removed successfully! 🎉",
        error: "Failed to remove background. 😞",
      },
      {
        position: "top-right",
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
    link.href = bgRemovedImage;

    // Set the download attribute with the file name you want to save as
    link.download = "image-bg-removed.png"; // You can change the filename as needed

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
        Remove Background Seamlessly
      </p>
      <p className="w-[70%] mx-auto text-center text-slate-400 font-semibold  text-sm leading-7 mb-[6%]">
        Remove unwanted backgrounds from any image with precision. Cleanly
        isolate subjects from their backgrounds, making your images versatile
        and ready for creative projects or professional use.
      </p>
      <div className="mb-[5%]">
        <p className="text-center text-slate-600 font-bold text-2xl mb-[5%] mt-[6%]">
          Steps You Need for Remove Background
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
          name="Remove Background"
          loadingName="Removing..."
        ></ImageUploader>

        {/* displaying the output file  */}
        <div className="flex justify-around items-center mt-10">
          {preview && bgRemovedImage && (
            <div className="">
              <h3 className="text-md font-semibold text-slate-600 text-center mb-5">
                Before
              </h3>
              <img
                src={preview}
                alt="Uploaded"
                className=" object-contain rounded-md w-[400px] h-[400px]"
              />
            </div>
          )}
          {bgRemovedImage && (
            <div className="">
              <h3 className="text-md font-semibold text-slate-600 text-center mb-5">
                After
              </h3>
              <img
                src={bgRemovedImage}
                alt="Error"
                className="object-contain rounded-md w-[400px] h-[400px]"
              />
            </div>
          )}
        </div>
        {bgRemovedImage && (
          <button
            onClick={handleSaveImage}
            className="flex items-center gap-x-2 bg-slate-600 font-semibold text-slate-100 px-5 py-3 mt-10 rounded-md  mx-auto hover:bg-slate-700"
          >
            Save New Image{" "}
            <span className="text-white text-xl">
              <IoIosSave></IoIosSave>
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export default Removebg;
