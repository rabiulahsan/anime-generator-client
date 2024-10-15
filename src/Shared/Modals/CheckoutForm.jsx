/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ details }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const { coins, price, name } = details;

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
      setLoading(false);
      setCardError("");
      // Process payment here
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
            className="w-[60%] bg-slate-600 font-semibold text-white py-3 rounded-lg hover:bg-slate-700 transition-colors"
            disabled={!stripe || loading || !elements}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
