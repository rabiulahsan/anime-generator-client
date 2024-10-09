/* eslint-disable react/prop-types */

import GithubSignin from "../SignInButton/GithubSignin";
import GoogleSignin from "../SignInButton/GoogleSignin";
import { IoMdCloseCircleOutline } from "react-icons/io";

const LoginModals = ({ showModal, handleClose }) => {
  if (!showModal) return null;

  //todo close by esc button and click other place in screen

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white pb-7 px-9 pt-12 rounded-xl w-[400px] relative">
        <p className="font-semibold text-slate-600 text-center text-xl mb-7">
          Log in to Create and Save Anime
        </p>
        <button
          className="absolute top-1 right-1 text-red-500 text-4xl"
          onClick={handleClose}
        >
          <IoMdCloseCircleOutline></IoMdCloseCircleOutline>{" "}
        </button>

        <div className="my-2">
          <GoogleSignin></GoogleSignin>
        </div>
        <p className="text-center text-gray-600">or</p>
        <div className="my-2">
          <GithubSignin></GithubSignin>
        </div>
      </div>
    </div>
  );
};

export default LoginModals;
