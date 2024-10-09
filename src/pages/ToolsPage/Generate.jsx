import { useState } from "react";
import StepsCard from "../../Shared/StepsCard/StepsCard";
import { RiAiGenerate } from "react-icons/ri";
import UseAuth from "../../Hooks/UseAuth/UseAuth";

const Generate = () => {
  const [prompt, setPrompt] = useState(""); // To store the user's prompt
  const [error, setError] = useState(""); // To store validation error
  const [loading, setLoading] = useState(false);
  const { user } = UseAuth();

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

  const handleGenerate = async () => {
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
    };
    console.log(promptData);
    try {
      const response = await fetch("http://localhost:5000/animies/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This ensures the server reads it as JSON
          "x-api-key": import.meta.env.VITE_CLIP_DROP_KEY, // Replace with your actual API key
        },
        body: JSON.stringify(promptData), // Convert the object to JSON string
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error during the API request:", error);
      alert("Something went wrong during image processing.");
    } finally {
      setLoading(false);
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
          className="w-full p-3 rounded-md border border-slate-300 focus:ring focus:ring-slate-400 focus:outline-none"
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
          className="flex items-center gap-x-2 bg-slate-600 font-semibold text-slate-100 px-5 py-3 mt-10 rounded-md  mx-auto hover:bg-slate-700"
        >
          {loading ? "Generating... " : "Generate"}
          <span>
            <RiAiGenerate></RiAiGenerate>
          </span>
        </button>
      </div>
    </>
  );
};

export default Generate;
