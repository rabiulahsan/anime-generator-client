/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const AnimiesCard = ({ details }) => {
  //   console.log(details);
  const { image_url, prompt } = details;

  return (
    <div className=" relative h-[350px]  w-[300px]  main  cursor-pointer my-5">
      {/* created dynamic link for category and country page  */}

      <img
        className="h-full w-full object-contain  rounded-lg mb-3"
        src={image_url}
        alt=""
      />

      <div className="card-hover overlay ">
        <div className=" px-8">
          <p className=" text-2xl text-sky-500 font-bold text-center mb-3">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimiesCard;
