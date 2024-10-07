import Banner from "../Banner/Banner";
import GallarySection from "../GallarySection/GallarySection";
import Navbar from "../Navbar/Navbar";
import Offers from "../Offers/Offers";
import Workwith from "../Workwith/Workwith";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" mx-[5%]">
        <Banner></Banner>
        <Workwith></Workwith>
        <GallarySection></GallarySection>
        <Offers></Offers>
      </div>
    </div>
  );
};

export default Home;
