import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import useAuth from "../../hook/useAuth";
import toast from "react-hot-toast";
import { compareAsc, format } from "date-fns";
import Swal from "sweetalert2";
import { LuFan } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const CheckoutForm = ({ handleClose, item, setOpen, refetch }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    _id,
    petName,
    petImage,
    donatedAmount,
    donationLastDate,
    maxDonationAmount,
    donationCreator,
  } = item;

  const dateOne = format(new Date(), "P");
  const dateTwo = format(new Date(donationLastDate), "P");
  const result = compareAsc(new Date(dateOne), new Date(dateTwo));

  const dbAmount = parseInt(maxDonationAmount);
  const inputedAmount = parseInt(price);

  if (item?.status === "paused") {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "This item is pause naw, Donation not acceptable in this moment!",
      showConfirmButton: false,
      timer: 1500,
    });
    setOpen(false);
  }

  if (dbAmount < inputedAmount) {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Donation amount must be lowest!",
      showConfirmButton: false,
      timer: 1500,
    });
    setOpen(false);
  }

  if (result === 1) {
    setOpen(false);
    return Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Donation date is over!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  useEffect(() => {
    if (price > 0) {
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
    setLoading(true);
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
      setError("");
      toast.success("Donate Successfull!");
      // close the modal
      handleClose();

      // update donation pirce
      const itemPrice = {
        donatedAmount: parseInt(donatedAmount) + parseInt(price),
      };
      axiosSecure
        .patch(`/donationAmountUpdate/${_id}`, itemPrice)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
          }
        });

      // create donation history in db
      const donationInfo = {
        petName: petName,
        petImage,
        donationCreator,
        paymentUser: user.displayName,
        paymentUserEmail: user.email,
        donationAmount: price,
      };

      axiosSecure.post("/donationsHistory", donationInfo).then((res) => {
        if (res.data.insertedId) {
          setLoading(false);
          navigate("/recommend");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-[#262A33]">
      <input
        type="number"
        placeholder="Enter Your Amount"
        className="w-full mb-6 border p-2 dark:bg-transparent dark:text-white"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
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
      <Button
        type="submit"
        disabled={!stripe || !clientSecret || price <= 0}
        className="px-6 bg-[#E16F52] dark:bg-gray-400 text-white mt-5 flex items-center gap-1"
      >
        Pay ${price || 0} {loading && <LuFan className="animate-spin" />}
      </Button>

      <p className="text-red-500 text-center mt-3">{error}</p>
    </form>
  );
};

export default CheckoutForm;
