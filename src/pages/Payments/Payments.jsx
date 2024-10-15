import { Player } from "@lottiefiles/react-lottie-player";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Navbar from "../Home/Navbar/Navbar";
import UseMyAllPayments from "../../Hooks/UseMyAllPayments/UseMyAllPayments";
import SkeletetonForTable from "../../Components/SkeletetonForTable/SkeletetonForTable";

const Payments = () => {
  const [myPayments, isLoading] = UseMyAllPayments();
  return (
    <div>
      <Navbar></Navbar>
      {myPayments.length === 0 ? (
        // Display 404 if no anime cards
        <div className="flex justify-center items-center my-[3%]">
          <div className="">
            <Player className="h-[300px]" autoplay loop src="/no.json"></Player>
            <p className="text-3xl font-extrabold text-slate-600 text-center mt-[5%]">
              You don&apos;t have any purchasae
            </p>
          </div>
        </div>
      ) : (
        <>
          <SectionTitle heading="All of your Purchase"></SectionTitle>
          {/* Show skeletons while loading */}
          {isLoading && <SkeletetonForTable number={10}></SkeletetonForTable>}
        </>
      )}
    </div>
  );
};

export default Payments;
