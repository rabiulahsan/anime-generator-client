import SkeletonCard from "../../Components/SkeletonCard/SkeletonCard";
import UseMyAllAnimies from "../../Hooks/UseMyAllAnimies/UseMyAllAnimies";
import AnimiesCard from "../Gallary/AnimiesCard";
import Navbar from "../Home/Navbar/Navbar";

const CreationPage = () => {
  const [myAnimies, isLoading] = UseMyAllAnimies();
  console.log(myAnimies);
  return (
    <>
      <Navbar></Navbar>
      <p className="text-slate-600 font-bold text-3xl my-[5%] text-center">
        Anime World - Your Creations
      </p>

      {/* this is for specific animy card   */}
      <div className="grid gap-x-5 gap-y-4 grid-cols-4 px-[10%]  mb-[5%]">
        {/* this is for skeleton */}
        {isLoading && <SkeletonCard number={16}></SkeletonCard>}
        {myAnimies.map((animie) => (
          <AnimiesCard key={animie?._id} details={animie}></AnimiesCard>
        ))}
      </div>
    </>
  );
};

export default CreationPage;
