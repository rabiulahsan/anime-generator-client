import { Player } from "@lottiefiles/react-lottie-player";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <Player className="h-[350px] " autoplay loop src="/error.json"></Player>
        <p className="text-5xl font-extrabold text-orange-500 text-center">
          404 Page Not Found
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
