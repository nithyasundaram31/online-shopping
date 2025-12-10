import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
 // your form component

const stripePromise = loadStripe("pk_test_51Sc182CaQiq6fveUZu7vAlmyBeKsXAMqW6I8LNx6h5gtrnnfyPQov02BDpn0kyKPANgdTCAMtJXLAAEEUydrLQZn003Ys14tY1");

export default function StripeCheckout() {
  const location = useLocation();
  const { clientSecret } = location.state || {}; // get clientSecret from navigate state

  if (!clientSecret) {
    return <div>❌ Payment cannot be processed. Missing clientSecret.</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
        <div className="  w-full h-full bg-gray-900 p-6"> <CheckoutForm /></div>
     
    </Elements>
  );
}
