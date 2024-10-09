import StepsCard from "../../Shared/StepsCard/StepsCard";

const Reimagine = () => {
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
        <p className="text-center text-slate-600 font-bold text-4xl mb-[5%] mt-[6%]">
          Steps You Need for Re-Imagination
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

export default Reimagine;
