/* eslint-disable react/prop-types */
const PaymentRow = ({ payment }) => {
  console.log(payment?.time);
  const { email, price, package: type, time, trxId } = payment;
  const formattedTime = new Date(time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 12-hour format with AM/PM
    day: "numeric",
    month: "long", // Full month name
    year: "numeric",
  });
  //   console.log(type);
  return (
    <tr className="hover:bg-slate-100 w-full text-center  ">
      <td className="py-5">{email}</td>
      <td className="">{type}</td>
      <td className="">{trxId}</td>
      <td className="">{price}</td>
      <td className="">{formattedTime}</td>
    </tr>
  );
};

export default PaymentRow;
