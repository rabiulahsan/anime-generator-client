/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GiTwoCoins } from "react-icons/gi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const ProfileModals = ({ showPaymentModal, handlePaymentClose, details }) => {
  const modalRef = useRef();
  const { coins, price, name } = details;

  // Close on 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handlePaymentClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handlePaymentClose]);

  // Close when clicking outside the modal
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handlePaymentClose();
    }
  };

  if (!showPaymentModal) return null;

  // load stripe by using publishable key and made a promise
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_KEY);

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-xl w-[400px] relative"
      >
        <p className="text-center text-slate-600 font-bold text-xl">
          Complete Your Purchase
        </p>
        <p className="text-center font-semibold text-slate-500 my-4 ">
          You&apos;re purchasing our{" "}
          <span className="font-bold text-xl text">{name}</span> plan, which
          includes{" "}
          <span className="font-bold text-xl text-orange-500 inline-flex items-center gap-x-1">
            {coins} <GiTwoCoins></GiTwoCoins>
          </span>{" "}
          for just{" "}
          <span className="font-bold text-xl text-sky-500">{price}$</span>
        </p>

        {/* it is for stripe payment  */}
        <Elements stripe={stripePromise}>
          <CheckoutForm details={details}></CheckoutForm>
        </Elements>
        <button
          className="absolute -top-4 -right-4 text-slate-100 text-3xl bg-sky-500  rounded-full "
          onClick={handlePaymentClose}
        >
          <IoMdCloseCircleOutline></IoMdCloseCircleOutline>{" "}
        </button>
      </div>
    </div>
  );
};

export default ProfileModals;
