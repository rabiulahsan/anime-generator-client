import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import Workwith from "../Workwith/Workwith";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" mx-[5%]">
        <Banner></Banner>
        <Workwith></Workwith>
      </div>
    </div>
  );
};

export default Home;
