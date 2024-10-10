import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import SkeletonCard from "../../../Components/SkeletonCard/SkeletonCard";
import UseAllAnimies from "../../../Hooks/UseAllAnimies/UseAllAnimies";
import AnimiesCard from "../../Gallary/AnimiesCard";

const GallarySection = () => {
  const [allAnimies, isLoading] = UseAllAnimies();
  return (
    <div className="mt-[5%]">
      <SectionTitle heading="Creations from Our Users"></SectionTitle>

      {/* this is for specific animy card   */}
      <div className="grid gap-x-5 gap-y-4 grid-cols-4 px-[10%] ">
        {/* this is for skeleton */}
        {isLoading && <SkeletonCard number={16}></SkeletonCard>}
        {allAnimies?.slice(0, 8)?.map((animie) => (
          <AnimiesCard key={animie?._id} details={animie}></AnimiesCard>
        ))}
      </div>
      <div className="flex justify-center items-center mb-[5%]">
        <Link to="/gallary">
          <button className="text-center font-semibold text-slate-100 bg-slate-600 px-5 py-3 mt-10 rounded-md mx-auto  hover:bg-slate-700">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GallarySection;
