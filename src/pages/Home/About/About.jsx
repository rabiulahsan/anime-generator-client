import { Player } from "@lottiefiles/react-lottie-player";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import FadeAnimations from "../../../Shared/FadeAnimations/FadeAnimations";

const About = () => {
  return (
    <div className="px-[10%] mb-[5%]">
      <SectionTitle heading="What Makes Us Different"></SectionTitle>
      <div className=" flex justify-between items-center ">
        <div className="w-1/2">
          <FadeAnimations
            direction="right"
            once={false}
            delay={0.3}
            duration={0.5}
          >
            <Player
              className="h-[300px] "
              autoplay
              loop
              src="/about.json"
            ></Player>
          </FadeAnimations>
        </div>
        <div className="w-1/2 text-slate-500 leading-8">
          <FadeAnimations
            direction="left"
            once={false}
            delay={0.3}
            duration={0.5}
          >
            We are dedicated to delivering top-notch quality and innovative
            solutions tailored to your needs. Our experienced team ensures fast,
            reliable service without compromising on excellence. With a
            customer-first approach, we offer premium results at competitive
            prices, making us the smart choice for your projects.
          </FadeAnimations>
        </div>
      </div>
    </div>
  );
};

export default About;
