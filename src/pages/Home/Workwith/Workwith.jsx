import Marquee from "react-fast-marquee";
import MarqueeCard from "./MarqueeCard";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Workwith = () => {
  return (
    <div className=" my-[4%]">
      <SectionTitle heading="We Featured In"></SectionTitle>
      <div className="w-[60%] mx-auto">
        <Marquee speed={90} loop={0} className="">
          <MarqueeCard image={"google.png"}></MarqueeCard>
          <MarqueeCard image={"amazon.png"}></MarqueeCard>
          <MarqueeCard image={"netflix.png"}></MarqueeCard>
          <MarqueeCard image={"microsoft.png"}></MarqueeCard>
          <MarqueeCard image={"samsung.png"}></MarqueeCard>
          <MarqueeCard image={"meta.png"}></MarqueeCard>
        </Marquee>
      </div>
    </div>
  );
};

export default Workwith;
