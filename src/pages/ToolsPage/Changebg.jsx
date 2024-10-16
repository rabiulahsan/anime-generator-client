import { IoIosSave } from "react-icons/io";
import ImageUploader from "../../Shared/ImageUploader/ImageUploader";
import StepsCard from "../../Shared/StepsCard/StepsCard";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Changebg = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [newBgImage, setNewBgImage] = useState(null);
  const [prompt, setPrompt] = useState(""); // To store the user's prompt
  const [error, setError] = useState(""); // To store validation error

  const stepCards = [
    {
      id: 1,
      desc: "Upload the image and describe the new background you want.",
      title: "Upload & Describe",
    },
    {
      id: 2,
      desc: "Click Generate to replace the image's background as per your prompt.",
      title: "Change Background",
    },
    {
      id: 3,
      desc: "Download the image with the newly changed background instantly.",
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        showToast(
          "Please upload an image in PNG, JPEG, or WebP format.",
          "error"
        );
        return;
      }
      // Resize image if it exceeds 1024px in width or height
      const resizedImage = await resizeImage(file, 2048);
      setPhoto(resizedImage); // Set the resized image for upload

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

  // Resize image using Canvas API
  const resizeImage = (file, maxSize) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let width = img.width;
          let height = img.height;

          // If the image exceeds the max size, scale it down proportionally
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = Math.round((height *= maxSize / width));
              width = maxSize;
            } else {
              width = Math.round((width *= maxSize / height));
              height = maxSize;
            }
          }

          // Set canvas dimensions to the new width and height
          canvas.width = width;
          canvas.height = height;

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas to a Blob (binary large object)
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
          }, file.type);
        };
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  //processing for the upscaling via clipdrop api
  const handleUpload = async () => {
    if (!photo) {
      showToast("Please select an image.", "error");
      return;
    }
    // Validate prompt character length
    if (prompt.length > 850) {
      setError("Prompt must be under 850 characters.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous error

    // Prepare FormData for the API request
    const form = new FormData();
    form.append("image_file", photo); // Append image file
    form.append("prompt", prompt);

    const replaceBgPromise = async () => {
      try {
        const response = await fetch(
          "https://clipdrop-api.co/replace-background/v1",
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

        setNewBgImage(imageUrl); // Set the new background image
        return imageUrl;
      } catch (error) {
        console.error("Error during the API request:", error);
        throw error; // Throw error for toast.promise to catch
      } finally {
        setLoading(false);
      }
    };

    // Use toast.promise for managing state notifications
    toast.promise(
      replaceBgPromise(),
      {
        pending: "Replacing background...",
        success: "Background replaced successfully! 🎉",
        error: "Failed to replace background. 😞",
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
    link.href = newBgImage;

    // Set the download attribute with the file name you want to save as
    link.download = "changed-background-image.png"; // You can change the filename as needed

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
        Change Background Instantly
      </p>
      <p className="w-[70%] mx-auto text-center text-slate-400 font-semibold  text-sm leading-7 mb-[6%]">
        Effortlessly change the background of any image by describing the scene
        you envision. Replace dull backgrounds with stunning new ones, perfect
        for creating unique visuals in seconds.
      </p>
      <div className="mb-[5%]">
        <p className="text-center text-slate-600 font-bold text-2xl mb-[5%] mt-[6%]">
          Steps You Need for Changing Background
        </p>
        <div className="flex  justify-center items-center   px-[5%] gap-x-6">
          {stepCards?.map((card) => (
            <StepsCard key={stepCards.id} card={card}></StepsCard>
          ))}
        </div>
      </div>

      {/* Prompt Input Field */}
      <div className="w-[70%] mx-auto my-8">
        <label
          htmlFor="prompt"
          className="block text-slate-600 font-semibold mb-2"
        >
          Describe the Background (max 850 characters):
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={850}
          className="w-full p-3 text-slate-600 rounded-md border border-slate-300 focus:ring focus:ring-slate-400 focus:outline-none"
          rows={5}
          placeholder="Type the background description here..."
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 font-semibold">{error}</p>
        )}
        <p className="text-slate-500 text-sm mt-2">
          {prompt.length}/850 characters used
        </p>
      </div>

      {/* for handlng images  and display them  */}
      <div className="mb-[5%]">
        {/* image uploader  */}
        <ImageUploader
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          photo={photo}
          loading={loading}
          name="Upload & Change Background"
          loadingName="Changing..."
        ></ImageUploader>

        {/* displaying the output file  */}
        <div className="flex justify-around items-center mt-10">
          {preview && newBgImage && (
            <div className="">
              <h3 className="text-md font-semibold text-slate-600 text-center mb-5">
                Old Image
              </h3>
              <img
                src={preview}
                alt="Uploaded"
                className=" object-contain rounded-md w-[400px] h-[400px]"
              />
            </div>
          )}
          {newBgImage && (
            <div className="">
              <h3 className="text-md font-semibold text-slate-600 text-center mb-5">
                After Background Change
              </h3>
              <img
                src={newBgImage}
                alt="Error"
                className="object-contain rounded-md w-[400px] h-[400px]"
              />
            </div>
          )}
        </div>
        {newBgImage && (
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

export default Changebg;
