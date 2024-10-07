import { Link } from "react-router-dom";
import { FaArrowRight, FaRegImages } from "react-icons/fa6";

const Banner = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <p className="text-5xl text-slate-700 font-bold mt-[5%] mb-[3%]">
        Instant Anime Creations, Just a Click Away!
      </p>
      <p className="w-[60%]  text-slate-400 font-semibold text-center leading-10 mb-[3%]">
        Create stunning custom anime images in seconds! Our AI-powered app
        brings your creative ideas to life, making it easy to craft personalized
        anime artwork. Dive into your anime world today!
      </p>
      <div className=" flex items-center gap-x-5">
        <Link to="/tools">
          <button className="bg-sky-500 font-semibold  px-5 py-[10px] rounded text-white flex items-center gap-x-2 hover:bg-sky-600">
            Get Started{" "}
            <span>
              <FaArrowRight></FaArrowRight>
            </span>
          </button>
        </Link>
        <Link to="/gallary">
          <button className="bg-slate-200 font-semibold  px-5 py-[10px] rounded text-black flex items-center gap-x-2 hover:bg-slate-300">
            View Gallary{" "}
            <span>
              <FaRegImages></FaRegImages>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
