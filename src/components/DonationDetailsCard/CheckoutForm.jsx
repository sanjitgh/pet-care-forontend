import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import useAuth from "../../hook/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = ({ handleClose, item }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState(0); // State for price
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    _id,
    petName,
    petImage,
    sortDescription,
    longDescription,
    donatedAmount,
    donationLastDate,
    postedDate,
  } = item;

  useEffect(() => {
    if (price > 0) {
      // Call API only if price is valid
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      console.log("Payment Intent:", paymentIntent);
      setError("");
      toast.success("Donate Successfull!");
      // close the modal
      handleClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter Your Amount"
        className="w-full mb-6 border p-2"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))} // Bind price state
      />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || price <= 0}
        className="px-6 py-2 border bg-[#E16F52] text-white mt-5"
      >
        Pay ${price || 0}
      </button>
      <p className="text-red-500 text-center mt-3">{error}</p>
    </form>
  );
};

export default CheckoutForm;
