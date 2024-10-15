/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import UseCoin from "../../Hooks/UseCoin/UseCoin";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ details, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const { coins, price, name } = details;
  const { coin, setCoin } = UseCoin();
  const { user } = UseAuth();
  const navigate = useNavigate();

  //create functions for posting the paymentdetails to database
  const sendPaymentDetails = async (paymentDetails) => {
    console.log(localStorage.getItem("access-token"));
    try {
      const response = await fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`, // Include authorization if required
        },
        body: JSON.stringify(paymentDetails), // Send the payment details
      });

      const data = await response.json();
      console.log(data.message); // Success message
    } catch (error) {
      console.error("Error sending payment details:", error);
    }
  };

  //create functions for increase the coin amount
  const increaseCoin = async () => {
    try {
      // increase coin by the number of coins
      const updatedCoin = coin + coins;

      // Call the API to update the coin value in the database
      const response = await fetch(
        `http://localhost:5000/users/update?email=${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coin: updatedCoin, type: "paid" }), // Send only the updated coin value
        }
      );

      if (response.ok) {
        // Update the local coin state with the new value

        setCoin(updatedCoin);
      } else {
        console.error("Failed to decrease coin in the database");
      }
    } catch (error) {
      console.error("Error decreasing coin:", error);
    }
  };

  //function for payment button
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;
    // console.log(details);

    const cardElement = elements.getElement(CardElement);
    if (cardElement == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setLoading(false);
      setCardError(error?.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      setCardError("");
      // Process payment here
    }

    //confirm payment
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (paymentError) {
      // Handle error here
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Handle successful payment here

      //increase the number of coin after successfull payment
      await increaseCoin();

      const paymentDetails = {
        price,
        package: name,
        name: user?.displayName,
        email: user?.email,
        coins,
        trxId: paymentIntent.id,
        time: new Date(),
      };

      // 2. Send payment details to the backend
      await sendPaymentDetails(paymentDetails);
      navigate("/");
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Information */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4 text-slate-600 text-center">
            Card Information
          </h2>
          <CardElement
            className="p-3 border border-gray-300 rounded-lg"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
          <p className="text-red-500 font-semibold  text-center mt-2 ">
            {" "}
            {cardError}
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            disabled={!stripe || loading || !elements || !clientSecret}
            className={`w-[60%] py-3 rounded-lg transition-colors 
                font-semibold text-white 
                ${
                  !stripe || loading || !elements || !clientSecret
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-slate-600 hover:bg-slate-700"
                }`}
          >
            {loading ? "Processing..." : "Pay"}
            {/* //todo design disable button  */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
