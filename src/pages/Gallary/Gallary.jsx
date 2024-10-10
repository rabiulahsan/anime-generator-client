import UseAllAnimies from "../../Hooks/UseAllAnimies/UseAllAnimies";
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
    </div>
  );
};

export default Gallary;
