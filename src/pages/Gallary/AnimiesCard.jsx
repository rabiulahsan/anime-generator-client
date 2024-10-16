/* eslint-disable react/prop-types */

const AnimiesCard = ({ details }) => {
  const { image_url, prompt } = details;

  return (
    <div className="relative   group">
      <div className="relative overflow-hidden rounded-lg">
        {/* Image with pop-up scaling effect */}
        <img
          className="h-full w-full object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={image_url}
          alt=""
        />

        {/* Overlay that slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-full bg-black bg-opacity-60 text-white flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out">
          <p className="text-xs text-center font-semibold px-5">{prompt}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimiesCard;
