/* eslint-disable react/prop-types */
import { FaGithub } from "react-icons/fa6";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";

const GithubSignin = ({ handleClose }) => {
  const { githubLogin } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGithubSignin = () => {};

  return (
    <div
      className="px-3 py-3 border-2 border-slate-400 rounded-full flex justify-center items-center  gap-x-4 text-slate-600 cursor-pointer font-semibold bg-white  hover:bg-slate-200 w-[70%] mx-auto"
      onClick={handleGithubSignin}
    >
      <span className="text-3xl ">
        <FaGithub></FaGithub>
      </span>
      <span className="">Sign in with Github</span>
    </div>
  );
};

export default GithubSignin;
