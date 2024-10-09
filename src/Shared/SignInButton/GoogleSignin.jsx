import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../../Hooks/UseAuth";

const GoogleSignin = () => {
  const { googleLogin } = UseAuth();
  // console.log(user);
  const navigate = useNavigate();
  const location = useLocation();

  //   const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    console.log("worked");

    googleLogin()
      .then((result) => {
        const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          image: loggedInUser?.photoURL,
          type: "free",
        };
        console.log(saveUser);
        fetch("https://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(location, { replace: true });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div
      className="px-3 py-3 border-2 border-slate-400 rounded-full flex justify-center items-center  gap-x-4 text-slate-600 cursor-pointer font-semibold bg-white  hover:bg-slate-200 w-[70%] mx-auto"
      onClick={handleGoogleSignIn}
    >
      <span className="text-3xl ">
        <FcGoogle></FcGoogle>
      </span>
      <span className="">Sign in With Google</span>
    </div>
  );
};

export default GoogleSignin;
