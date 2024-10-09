/* eslint-disable react/prop-types */
const StepsCard = ({ card }) => {
  const { id, title, desc } = card;
  return (
    <div className="flex flex-col items-center p-6 rounded-lg bg-slate-200 h-[250px]">
      {" "}
      {/* Set a fixed height */}
      <div className="flex items-center justify-center w-12 h-12 border border-slate-500 rounded-full mb-4">
        <span className="text-2xl font-bold text-slate-700">{id}</span>
      </div>
      <h3 className="text-xl text-slate-600 font-bold">{title}</h3>
      <p className="text-center mt-2 text-slate-600 line-clamp-3">
        {desc}
      </p>{" "}
      {/* Limit to 3 lines */}
    </div>
  );
};

export default StepsCard;
