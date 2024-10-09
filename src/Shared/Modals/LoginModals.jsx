/* eslint-disable react/prop-types */

import GithubSignin from "../SignInButton/GithubSignin";
import GoogleSignin from "../SignInButton/GoogleSignin";

const LoginModals = ({ showModal, handleClose }) => {
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
