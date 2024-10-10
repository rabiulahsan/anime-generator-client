/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
// import "./CardForAnimies.css";
const AnimiesCard = ({ details }) => {
  //   console.log(details);
  const { image_url, prompt } = details;

  // this is for animation
  const items = {
    initial: {
      y: "100",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div variants={items}>
      <div className=" relative h-[240px]  main  cursor-pointer my-5">
        {/* created dynamic link for category and country page  */}

        <img
          className="h-full w-full object-cover  rounded-lg mb-3"
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
    </motion.div>
  );
};

export default AnimiesCard;
