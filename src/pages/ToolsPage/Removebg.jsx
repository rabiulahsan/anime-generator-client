import StepsCard from "../../Shared/StepsCard/StepsCard";

const Removebg = () => {
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
    </>
  );
};

export default Removebg;
