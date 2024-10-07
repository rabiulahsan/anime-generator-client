import Banner from "../Banner/Banner";
import GallarySection from "../GallarySection/GallarySection";
import Navbar from "../Navbar/Navbar";
import Workwith from "../Workwith/Workwith";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" mx-[5%]">
        <Banner></Banner>
        <Workwith></Workwith>
        <GallarySection></GallarySection>
      </div>
    </div>
  );
};

export default Home;
