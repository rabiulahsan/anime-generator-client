import { Player } from "@lottiefiles/react-lottie-player";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Navbar from "../Home/Navbar/Navbar";
import UseMyAllPayments from "../../Hooks/UseMyAllPayments/UseMyAllPayments";
import SkeletetonForTable from "../../Components/SkeletetonForTable/SkeletetonForTable";
import PaymentRow from "./PaymentRow";

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
          <SectionTitle heading="All of your Purchases"></SectionTitle>
          {/* Show skeletons while loading */}
          {isLoading && <SkeletetonForTable number={10}></SkeletetonForTable>}
          <div className="my-[3%] mx-[3%] px-[5%] bg-white rounded-[10px]">
            <table className="table-fixed w-full ">
              {/* head */}
              <thead className="border border-t-0 border-l-0 border-r-0 border-b-slate-500 bg-slate-100">
                <tr>
                  <th className="py-5">Email</th>
                  <th>Package</th>
                  <th>Transaction ID</th>
                  <th>Price</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {myPayments?.map((payment) => (
                  <PaymentRow key={payment._id} payment={payment}></PaymentRow>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Payments;
