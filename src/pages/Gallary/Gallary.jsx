import UseAllAnimies from "../../Hooks/UseAllAnimies/UseAllAnimies";
import StaggerAnimation from "../../Shared/StaggerAnimation/StaggerAnimation";
import Navbar from "../Home/Navbar/Navbar";

const Gallary = () => {
  const [allAnimies, isLoading] = UseAllAnimies();
  console.log(allAnimies);
  return (
    <div>
      <Navbar></Navbar>
      <p className="text-slate-600 font-bold text-3xl my-[5%] text-center">
        Anime World- Users Creations
      </p>

      {/* this is for  animation  */}
      <StaggerAnimation delayChildren={0.2} staggerChildren={0.2}>
        {/* this is for specific country card  */}
        <div className="grid gap-x-16 gap-y-16 grid-cols-1 lg:grid-cols-4 px-[10%]  ">
          {/* {countries.map((country) => (
            <CardForPage key={country?.id} details={country}></CardForPage>
          ))} */}
        </div>
        <div className="grid gap-x-20 gap-y-16 grid-cols-1 lg:grid-cols-3 px-[10%]  ">
          {/* this id for skeleton */}
          {/* {isLoading && <SkeletonCard number={16}></SkeletonCard>}
        {allBlogs.map((place) => (
          <BlogsCard key={place.index} place={place}></BlogsCard>
        ))} */}
        </div>
      </StaggerAnimation>
    </div>
  );
};

export default Gallary;
