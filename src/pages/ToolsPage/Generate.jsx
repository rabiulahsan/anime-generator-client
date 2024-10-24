import { useState } from "react";
import StepsCard from "../../Shared/StepsCard/StepsCard";
import { RiAiGenerate } from "react-icons/ri";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { IoIosSave } from "react-icons/io";
import LoginModals from "../../Shared/Modals/LoginModals";
import UseCoin from "../../Hooks/UseCoin/UseCoin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Generate = () => {
  const [prompt, setPrompt] = useState(""); // To store the user's prompt
  const [error, setError] = useState(""); // To store validation error
  const [loading, setLoading] = useState(false);
  const { user } = UseAuth();
  const { coin, decreaseCoin } = UseCoin();
  const [generatedImage, setGeneratedImage] = useState(null);

  //for showing modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const stepCards = [
    {
      id: 1,
      desc: "Describe your anime character idea in the prompt box.",
      title: "Type",
    },
    {
      id: 2,
      desc: "Click Generate to turn your text into a unique anime image.",
      title: "Genrate",
    },
    {
      id: 3,
      desc: "Download your generated anime character instantly.",
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

  const handleGenerate = async () => {
    if (!user) {
      showToast("You need to log in to use this feature.", "warning");
      openModal(); // Open the login modal
      return;
    }

    // Check if user has enough coins
    if (coin === 0) {
      showToast(
        "You don't have enough coins to generate. Buy subscription and come back.",
        "error"
      );
      return;
    }
    // Check if prompt is empty
    if (!prompt.trim()) {
      showToast("Prompt cannot be empty.", "error");
      return;
    }

    // Validate prompt character length
    if (prompt.length > 850) {
      setError("Prompt must be under 850 characters.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous error

    const promptData = {
      prompt: prompt,
      email: user?.email,
      name: user?.displayName,
    };
    // console.log(promptData);

    // Define the entire process as a promise for toast
    const generateAnimePromise = async () => {
      try {
        // Retrieve JWT token from localStorage
        const token = localStorage.getItem("access-token");

        // Make the POST request to generate the image
        const response = await fetch(
          "https://anime-generator-sever.vercel.app/animies/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Ensure the server reads it as JSON
              "x-api-key": import.meta.env.VITE_CLIP_DROP_KEY, // Replace with your actual API key
              Authorization: `Bearer ${token}`, // Add JWT token to headers
            },
            body: JSON.stringify(promptData), // Convert the object to JSON string
          }
        );

        if (!response.ok) {
          throw new Error("Failed to generate image");
        }

        const result = await response.json();
        console.log(result);

        const { insertedId } = result; // Extract the insertedId

        // Fetch the generated image using the insertedId
        const imageResponse = await fetch(
          `https://anime-generator-sever.vercel.app/animies/generated/${insertedId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add JWT token to headers for this request as well
            },
          }
        );

        if (!imageResponse.ok) {
          throw new Error("Failed to fetch generated image");
        }

        const imageData = await imageResponse.json();
        setGeneratedImage(imageData.image_url); // Set the generated image URL

        // Decrease coin after successful generation
        await decreaseCoin(); // This will update both the backend and frontend
        return imageData.image_url; // Return image URL for toast success handling
      } catch (error) {
        console.error("Error during the API request:", error);
        throw error; // Re-throw error for toast.promise to catch
      } finally {
        setLoading(false);
      }
    };

    // Use toast.promise for managing the process with real-time feedback
    toast.promise(
      generateAnimePromise(),
      {
        pending: "Generating your anime image...",
        success: "Anime image generated successfully! 🎉",
        error: "Failed to generate the image. 😞",
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
  const handleSaveImage = async () => {
    try {
      const response = await fetch(generatedImage); // Fetch the image
      const blob = await response.blob(); // Convert it to a Blob
      const url = URL.createObjectURL(blob); // Create a URL for the Blob

      // Create an anchor element
      const link = document.createElement("a");
      link.href = url;

      // Set the download attribute with the file name you want to save as
      link.download = "generated-anime.png"; // You can change the filename as needed

      // Append the anchor to the document
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the anchor from the document
      document.body.removeChild(link);

      // Revoke the object URL to free up memory
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <>
      <p className="text-center text-slate-600 font-bold text-4xl mb-[3%] mt-[6%]">
        Create Stunning Anime
      </p>
      <p className="w-[70%] mx-auto text-center text-slate-400 font-semibold  text-sm leading-7 mb-[6%]">
        Generate captivating anime art by simply writing a prompt. Whether you
        are imagining characters, landscapes, or entire scenes, bring your ideas
        to life in vivid, artistic anime style.
      </p>
      <div className="mb-[5%]">
        <p className="text-center text-slate-600 font-bold text-2xl mb-[5%] mt-[6%]">
          Steps You Need for Anime Creation
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
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`flex items-center gap-x-2 font-semibold text-slate-100 px-5 py-3 mt-10 rounded-md mx-auto 
    ${
      loading
        ? "bg-slate-400 hover:bg-slate-400"
        : "bg-slate-700 hover:bg-slate-800"
    }`}
        >
          {loading ? "Generating... " : "Generate"}
          <span>
            <RiAiGenerate />
          </span>
        </button>

        {generatedImage && (
          <>
            <img
              className="object-contain h-[500px] w-[500px] rounded-md mx-auto mt-10"
              src={generatedImage}
              alt="Generated Image"
            />
            <button
              onClick={handleSaveImage}
              className="flex items-center gap-x-2 bg-slate-600 font-semibold text-slate-100 px-5 py-3 mt-10 rounded-md  mx-auto hover:bg-slate-700"
            >
              Save New Image{" "}
              <span className="text-white text-xl">
                <IoIosSave></IoIosSave>
              </span>
            </button>
          </>
        )}
      </div>
      <LoginModals showModal={showModal} handleClose={closeModal} />
    </>
  );
};

export default Generate;
