/* eslint-disable react/prop-types */

import GoogleSignin from "../GoogleSignin/GoogleSignin";

const LoginModals = ({ showModal, handleClose, type }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-[400px] relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={handleClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {type === "login" ? "Log In" : "Sign Up"}
        </h2>

        <div className="my-5">
          <GoogleSignin></GoogleSignin>
        </div>
        <p className="text-center text-gray-600 my-2">or</p>
        <div className="my-5">
          <GoogleSignin></GoogleSignin>
        </div>
      </div>
    </div>
  );
};

export default LoginModals;
