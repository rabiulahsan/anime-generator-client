import UseAllAnimies from "../../Hooks/UseAllAnimies/UseAllAnimies";
import Navbar from "../Home/Navbar/Navbar";
import SkeletonCard from "../../Components/SkeletonCard/SkeletonCard";
import AnimiesCard from "./AnimiesCard";

const Gallary = () => {
  const [allAnimies, isLoading] = UseAllAnimies();
  // console.log(allAnimies);
  return (
    <>
      <Navbar></Navbar>
      <p className="text-slate-600 font-bold text-3xl my-[5%] text-center">
        Anime World- Users Creations
      </p>

      {/* this is for specific animy card   */}
      <div className="grid gap-x-5 gap-y-4 grid-cols-4 px-[10%]  mb-[5%]">
        {/* this is for skeleton */}
        {isLoading && <SkeletonCard number={16}></SkeletonCard>}
        {allAnimies.map((animie) => (
          <AnimiesCard key={animie?._id} details={animie}></AnimiesCard>
        ))}
      </div>
    </>
  );
};

export default Gallary;
