import { FaArrowRight } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const OffersCard = ({ card }) => {
  const { title, name, image, left, description } = card;

  return (
    <div className="flex justify-between items-center mx-[6%] mb-[5%] px-[6%] py-[3%] bg-transparent rounded-lg">
      {/* Conditionally render layout based on `left` */}
      {left ? (
        <>
          {/* Left Section with Text */}
          <div className="w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
            <p className="text-slate-500 leading-7">{description}</p>
            <button className="offers-card-btn mt-4 flex items-center gap-x-2">
              {name} <FaArrowRight></FaArrowRight>
            </button>
          </div>

          {/* Right Section with Image */}
          <div className="w-1/2">
            <img
              src={image}
              alt={image}
              className="rounded-2xl h-[250px] mx-auto"
            />
          </div>
        </>
      ) : (
        <>
          {/* Right Section with Image (Swap position if `left` is false) */}
          <div className="w-1/2">
            <img
              src={image}
              alt={image}
              className="rounded-2xl h-[250px] mx-auto"
            />
          </div>

          {/* Left Section with Text */}
          <div className="w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
            <p className="text-slate-500 leading-7">{description}</p>
            <button className="offers-card-btn mt-4 flex items-center gap-x-2">
              {name} <FaArrowRight></FaArrowRight>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OffersCard;
