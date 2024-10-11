/* eslint-disable react/prop-types */
import { useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import PaymentModals from "../../Shared/Modals/PaymentModals";

const PricingCard = ({ details }) => {
  const { price, coins, description, name } = details;

  //for showing payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const openPaymentModal = () => {
    setShowPaymentModal(true);
  };
  const closePaymentModal = () => setShowPaymentModal(false);

  return (
    <div className=" py-10 px-6 rounded-md bg-slate-200 w-[300px] flex flex-col items-center">
      <p className="text-slate-600 font-bold text-3xl">{name}</p>
      <p className="text-slate-500 font-semibold mb-3">{description}</p>
      <p className="text-slate-500 font-semibold mb-5 flex items-center text-center ">
        <span className="text-2xl font-bold text-orange-500 mr-5 flex items-center gap-x-1">
          {coins}
          <GiTwoCoins></GiTwoCoins>
        </span>
        for{" "}
        <span className="text-2xl font-bold text-sky-500 ml-5">{price}$</span>
      </p>
      <button
        onClick={openPaymentModal}
        className="text-white bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded font-semibold mx-auto"
      >
        Get Started with <span>{name}</span>{" "}
      </button>
      <PaymentModals
        showPaymentModal={showPaymentModal}
        handlePaymentClose={closePaymentModal}
        details={details}
      ></PaymentModals>
    </div>
  );
};

export default PricingCard;
