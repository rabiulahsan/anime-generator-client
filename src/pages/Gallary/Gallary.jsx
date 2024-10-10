import UseAllAnimies from "../../Hooks/UseAllAnimies/UseAllAnimies";
import StaggerAnimation from "../../Shared/StaggerAnimation/StaggerAnimation";
import Navbar from "../Home/Navbar/Navbar";
import SkeletonCard from "../../Components/SkeletonCard/SkeletonCard";
import AnimiesCard from "./AnimiesCard";

const Gallary = () => {
  const [allAnimies, isLoading] = UseAllAnimies();
  // console.log(allAnimies);
  return (
    <div>
      <Navbar></Navbar>
      <p className="text-slate-600 font-bold text-3xl my-[5%] text-center">
        Anime World- Users Creations
      </p>

      {/* this is for  animation  */}
      <StaggerAnimation delayChildren={0.2} staggerChildren={0.2}>
        {/* this is for specific animy card   */}
        <div className="grid gap-x-16 gap-y-16 grid-cols-1 lg:grid-cols-4 px-[10%]  ">
          {/* this is for skeleton */}
          {isLoading && <SkeletonCard number={16}></SkeletonCard>}
          {allAnimies.map((animie) => (
            <AnimiesCard key={animie?._id} details={animie}></AnimiesCard>
          ))}
        </div>
      </StaggerAnimation>
    </div>
  );
};

export default Gallary;
