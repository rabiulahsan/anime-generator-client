import StepsCard from "../../Shared/StepsCard/StepsCard";

const Changebg = () => {
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

export default Changebg;
