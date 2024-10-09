import StepsCard from "../../Shared/StepsCard/StepsCard";

const Upscaling = () => {
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
        <p className="text-center text-slate-600 font-bold text-4xl mb-[5%] mt-[6%]">
          Steps You Need for Anime Creation
        </p>
        <div className="flex  justify-center items-center   px-[5%] gap-x-6">
          {stepCards?.map((card) => (
            <StepsCard key={stepCards.id} card={card}></StepsCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Upscaling;
