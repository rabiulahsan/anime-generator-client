import OffersCard from "../Home/Offers/OffersCard";

const ToolsPage = () => {
  const cards = [
    {
      id: 1,
      title: "Create Stunning Anime",
      name: "Generate Anime",
      image: "generate.jpg",
      left: 0,
      url: "/generate",
      description:
        "Generate captivating anime art by simply writing a prompt. Whether you're imagining characters, landscapes, or entire scenes, bring your ideas to life in vivid, artistic anime style.",
    },
    {
      id: 2,
      title: "High-Resolution Upscaling",
      name: "Upscaling",
      image: "upscale.jpg",
      left: 1,
      url: "/upscale",
      description:
        "Enhance the quality of your images with AI-powered upscaling. Improve resolution, sharpen details, and make your images look crisper and more professional with just a click.",
    },
    {
      id: 3,
      title: "Change Background Instantly",
      name: "Change Background",
      image: "changebg.jpg",
      left: 0,
      url: "bgchange",
      description:
        "Effortlessly change the background of any image by describing the scene you envision. Replace dull backgrounds with stunning new ones, perfect for creating unique visuals in seconds.",
    },
    {
      id: 4,
      title: "Remove Background Seamlessly",
      name: "Remove Background",
      image: "remove.jpg",
      left: 1,
      url: "/bgremove",
      description:
        "Remove unwanted backgrounds from any image with precision. Cleanly isolate subjects from their backgrounds, making your images versatile and ready for creative projects or professional use.",
    },
    {
      id: 5,
      title: "Reimagine Your Visuals",
      name: "Reimagine",
      image: "reimagine.jpg",
      left: 0,
      url: "reimagine",
      description:
        "Transform your images into something entirely new by using AI to reimagine them. Modify styles, tweak elements, or explore alternate versions of your visuals for endless creative possibilities.",
    },
  ];
  return (
    <>
      <p className="text-center text-slate-600 font-bold text-4xl mb-[3%] mt-[6%]">
        AI Tools for Image Enhancement
      </p>
      <p className="w-[70%] mx-auto text-center text-slate-400 font-semibold  text-sm leading-7 mb-[6%]">
        Transform your images with AI-powered tools. Upscale photo resolution,
        reimagine visuals with creative filters, change or remove backgrounds
        seamlessly, and even generate anime-style artwork. Unlock the full
        potential of your images, all in one place, with fast, intuitive, and
        powerful features.
      </p>
      <div className=" flex flex-col">
        {cards?.map((card) => (
          <OffersCard key={card.id} card={card}></OffersCard>
        ))}
      </div>
    </>
  );
};

export default ToolsPage;