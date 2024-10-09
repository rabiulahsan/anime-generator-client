import { useState } from "react";
import StepsCard from "../../Shared/StepsCard/StepsCard";
import ImageUploader from "../../Shared/ImageUploader/ImageUploader";
import { IoIosSave } from "react-icons/io";

const Reimagine = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [reImaginedImage, setReImaginedImage] = useState(null);

  const stepCards = [
    {
      id: 1,
      desc: "Upload an image and describe the new concept or style you want.",
      title: "Upload & Describe",
    },
    {
      id: 2,
      desc: "Click Generate to reimagine the image based on your prompt.",
      title: "Reimagine Image",
    },
    {
      id: 3,
      desc: "Download the newly reimagined image with the updated style instantly.",
      title: "Download",
    },
  ];

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        alert("Please upload an image in PNG, JPEG, or WebP format.");
        return;
      }

      // Resize image if it exceeds 1024px in width or height
      const resizedImage = await resizeImage(file, 1024);
      setPhoto(resizedImage); // Set the resized image for upload

      // Preview the image before upload using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the base64 URL for preview
      };
      reader.readAsDataURL(file); // Convert file to base64 format for display
    } else {
      alert("File size exceeds 10MB or file type is not supported.");

      //todo set sweetalert
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
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    // Prepare FormData for the API request
    const form = new FormData();
    form.append("image_file", photo); // Append image file

    try {
      const response = await fetch(
        "https://clipdrop-api.co/reimagine/v1/reimagine",
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_CLIP_DROP_KEY, // Replace with your actual API key
          },
          body: form,
        }
      );
      console.log(response);
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);

      setReImaginedImage(imageUrl);
    } catch (error) {
      console.error("Error during the API request:", error);
      alert("Something went wrong during image processing.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the download
  const handleSaveImage = () => {
    // Create an anchor element
    const link = document.createElement("a");

    // Set the href to the upscaled image URL
    link.href = reImaginedImage;

    // Set the download attribute with the file name you want to save as
    link.download = "re-imagined.png"; // You can change the filename as needed

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
        Reimagine Your Visuals
      </p>
      <p className="w-[70%] mx-auto text-center text-slate-400 font-semibold  text-sm leading-7 mb-[6%]">
        Transform your images into something entirely new by using AI to
        reimagine them. Modify styles, tweak elements, or explore alternate
        versions of your visuals for endless creative possibilities.
      </p>
      <div className="mb-[5%]">
        <p className="text-center text-slate-600 font-bold text-2xl mb-[5%] mt-[6%]">
          Steps You Need for Re-Imagination
        </p>
        <div className="flex  justify-center items-center   px-[5%] gap-x-6">
          {stepCards?.map((card) => (
            <StepsCard key={stepCards.id} card={card}></StepsCard>
          ))}
        </div>
      </div>

      {/* for handlng images  and display them  */}
      <div className="mb-[5%]">
        {/* image uploader  */}
        <ImageUploader
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          photo={photo}
          loading={loading}
          name="Upload & Reimagine"
          loadingName="Reimagining"
        ></ImageUploader>

        {/* displaying the output file  */}
        <div className="flex justify-around items-center mt-10">
          {preview && reImaginedImage && (
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
          {reImaginedImage && (
            <div className="">
              <h3 className="text-md font-semibold text-slate-600 text-center mb-5">
                Reimagined Image
              </h3>
              <img
                src={reImaginedImage}
                alt="Upscaled"
                className="object-contain rounded-md w-[400px] h-[400px]"
              />
            </div>
          )}
        </div>
        {reImaginedImage && (
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

export default Reimagine;
