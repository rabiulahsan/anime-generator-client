import About from "../About/About";
import Banner from "../Banner/Banner";
import GallarySection from "../GallarySection/GallarySection";
import Navbar from "../Navbar/Navbar";
import Offers from "../Offers/Offers";
import Questions from "../Questions/Questions";
import Workwith from "../Workwith/Workwith";
import Footer from "../../../Shared/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" mx-[5%]">
        <Banner></Banner>
        <Workwith></Workwith>
        <GallarySection></GallarySection>
        <Offers></Offers>
        <Questions></Questions>
        <About></About>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
