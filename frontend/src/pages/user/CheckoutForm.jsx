// CheckoutForm.jsx
import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button  className="  mt-4 bg-green-500 px-2 py-1  rounded transform transition  active:scale-90 hover:bg-green-600"disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
