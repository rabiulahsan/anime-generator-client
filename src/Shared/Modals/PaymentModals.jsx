/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GiTwoCoins } from "react-icons/gi";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import UseCoin from "../../Hooks/UseCoin/UseCoin";
import UseUserData from "../../Hooks/UseUserData/UseUserData";
import { Link } from "react-router-dom";

const ProfileModals = ({ showPaymentModal, handlePaymentClose, details }) => {
  const modalRef = useRef();
  const { user } = UseAuth();
  const { coin } = UseCoin();
  const [userData] = UseUserData();
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

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-xl w-[400px] relative"
      >
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
