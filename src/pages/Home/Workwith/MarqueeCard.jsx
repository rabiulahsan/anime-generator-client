/* eslint-disable react/prop-types */
const MarqueeCard = ({ image }) => {
  return (
    <div>
      <img className="w-[100px] h-[50px] mx-7" src={image} alt="" />
    </div>
  );
};

export default MarqueeCard;