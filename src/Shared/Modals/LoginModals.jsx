/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

import GoogleSignin from "../SignInButton/GoogleSignin";
import { IoMdCloseCircleOutline } from "react-icons/io";

const LoginModals = ({ showModal, handleClose }) => {
  const modalRef = useRef();

  // Close on 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  // Close when clicking outside the modal
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  if (!showModal) return null;
  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        className="bg-white pb-7 px-9 pt-12 rounded-xl w-[400px] relative"
      >
        <p className="font-semibold text-slate-600 text-center text-xl mb-7">
          Log in to Create and Save Anime
        </p>
        <button
          className="absolute -top-4 -right-4 text-slate-100 text-3xl bg-sky-500  rounded-full "
          onClick={handleClose}
        >
          <IoMdCloseCircleOutline></IoMdCloseCircleOutline>{" "}
        </button>

        <div className="my-2">
          <GoogleSignin handleClose={handleClose}></GoogleSignin>
        </div>
        {/* <p className="text-center text-slate-500 font-bold">or</p>
        <div className="my-2">
          <GithubSignin handleClose={handleClose}></GithubSignin>
        </div> */}
      </div>
    </div>
  );
};

export default LoginModals;
