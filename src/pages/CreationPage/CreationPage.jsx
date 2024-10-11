import { Player } from "@lottiefiles/react-lottie-player";
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

      {myAnimies.length === 0 ? (
        // Display 404 if no anime cards
        <div className="flex justify-center items-center my-[3%]">
          <div className="">
            <Player className="h-[300px]" autoplay loop src="/no.json"></Player>
            <p className="text-3xl font-extrabold text-slate-600 text-center mt-[5%]">
              You don&apos;t have any creations
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-slate-600 font-bold text-3xl my-[5%] text-center">
            Anime World - Your Creations
          </p>
          {/* // Display anime cards when they exist */}
          <div className="grid gap-x-5 gap-y-4 grid-cols-4 px-[10%]  mb-[5%]">
            {/* Show skeletons while loading */}
            {isLoading && <SkeletonCard number={16}></SkeletonCard>}
            {/* Display anime cards once they are loaded */}
            {myAnimies.map((animie) => (
              <AnimiesCard key={animie?._id} details={animie}></AnimiesCard>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CreationPage;
