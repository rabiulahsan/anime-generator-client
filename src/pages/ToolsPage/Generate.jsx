import StepsCard from "../../Shared/StepsCard/StepsCard";

const Generate = () => {
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
  return (
    <div>
      <p className="text-center text-slate-600 font-bold text-4xl mb-[3%] mt-[6%]">
        Create Stunning Anime
      </p>
      <p className="w-[70%] mx-auto text-center text-slate-400 font-semibold  text-sm leading-7 mb-[6%]">
        Generate captivating anime art by simply writing a prompt. Whether you
        are imagining characters, landscapes, or entire scenes, bring your ideas
        to life in vivid, artistic anime style.
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
    </div>
  );
};

export default Generate;
