import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" mx-[5%]">
        <Banner></Banner>
      </div>
    </div>
  );
};

export default Home;
