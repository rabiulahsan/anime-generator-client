import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Navbar from "../Home/Navbar/Navbar";
import PricingCard from "./PricingCard";

const PricingPage = () => {
  const plans = [
    {
      id: 1,
      name: "Basics",
      price: 25,
      coins: 250,
      description: "Affordable starter plan.",
    },
    {
      id: 2,
      name: "Pro",
      price: 40,
      coins: 500,
      description: "Enhanced plan with more coins.",
    },
    {
      id: 3,
      name: "Enterprise",
      price: 80,
      coins: 1000,
      description: "Premium plan for large needs.",
    },
  ];
  return (
    <div>
      <Navbar></Navbar>
      <SectionTitle heading="Buy Your Best Package"></SectionTitle>
      <div className="flex justify-center items-center gap-x-8 mb-[5%]">
        {plans.map((plan) => (
          <PricingCard key={plan.id} details={plan}></PricingCard>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
