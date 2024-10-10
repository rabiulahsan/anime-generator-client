import UseAllAnimies from "../../Hooks/UseAllAnimies/UseAllAnimies";
import Navbar from "../Home/Navbar/Navbar";

const Gallary = () => {
  const [allAnimies, isLoading] = UseAllAnimies();
  console.log(allAnimies);
  return (
    <div>
      <Navbar></Navbar>
      <p>this is gallary page</p>
    </div>
  );
};

export default Gallary;
