/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GiTwoCoins } from "react-icons/gi";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import UseCoin from "../../Hooks/UseCoin/UseCoin";
import UseUserData from "../../Hooks/UseUserData/UseUserData";
import UseMyAllAnimies from "../../Hooks/UseMyAllAnimies/UseMyAllAnimies";

const ProfileModals = ({ showProfileModal, handleProfileClose }) => {
  const modalRef = useRef();
  const { user } = UseAuth();
  const { coin } = UseCoin();
  const [userData] = UseUserData();
  const [myAnimies] = UseMyAllAnimies();

  // Close on 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleProfileClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleProfileClose]);

  // Close when clicking outside the modal
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleProfileClose();
    }
  };

  if (!showProfileModal) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-xl w-[400px] relative"
      >
        <img
          className="rounded-full mx-auto border-4 border-slate-400 h-[80px] w-[80px]"
          src={user?.photoURL}
          alt=""
        />
        <p className="font-semibold text-slate-600 text-center  mb-4 mt-3">
          {user?.displayName}
        </p>
        <div className=" flex justify-between items-center mx-auto w-1/2">
          <p
            title="remaining coins"
            className="flex items-center gap-x-1 text-xl font-semibold bg-slate-200 p-3 rounded-md"
          >
            {" "}
            <GiTwoCoins></GiTwoCoins>
            {coin}
          </p>
          <p
            title="type of membership"
            className="font-semibold bg-slate-200 rounded-md p-3 text-xl"
          >
            {userData?.type}
          </p>
        </div>
        <p className="text-center font-semibold text-slate-600 my-3">
          Total Genrations: {myAnimies?.length}
        </p>

        <div className=" flex justify-between items-center w-3/4 mx-auto mt-5">
          <button className="px-3 py-2 bg-slate-600 text-slate-50 rounded font-semibold hover:bg-slate-700">
            Payments
          </button>
          <button className="flex items-center gap-x-2 px-3 py-2 rounded bg-sky-500 text-white font-semibold hover:bg-sky-600">
            Buy Coins <GiTwoCoins></GiTwoCoins>
          </button>
        </div>

        <button
          className="absolute -top-4 -right-4 text-slate-100 text-3xl bg-sky-500  rounded-full "
          onClick={handleProfileClose}
        >
          <IoMdCloseCircleOutline></IoMdCloseCircleOutline>{" "}
        </button>
      </div>
    </div>
  );
};

export default ProfileModals;
