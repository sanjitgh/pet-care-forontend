import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Button } from "@material-tailwind/react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// stripe code
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const DonationDetailsCard = ({ item, refetch }) => {
  const {
    petName,
    petImage,
    sortDescription,
    longDescription,
    donatedAmount,
    donationLastDate,
    postedDate,
    maxDonationAmount
  } = item;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{petName} -PateCare</title>
      </Helmet>
      <div>
        <div className="flex flex-col gap-4 text-center mb-10">
          <h1 className="text-2xl md:text-5xl">{petName}</h1>
          <p>{sortDescription}</p>
        </div>
        <div>
          <img
            src={petImage}
            alt="pet image"
            className="w-full max-h-[600px] object-cover"
          />
        </div>
        <div className="my-5">
          <p>{longDescription}</p>
        </div>
        <div>
          <p>
            <b> Total Donation: </b>
            <span>${donatedAmount}</span>
          </p>
          <p>
            <b> Need Money: </b>
            <span>${maxDonationAmount}</span>
          </p>
          <p>
            <b> Posted Date: </b>
            <span>{format(new Date(postedDate), "P")}</span>
          </p>
          <p>
            <b> Donation Last Date: </b>
            <span>{format(new Date(donationLastDate), "P")}</span>
          </p>
        </div>
        {/* donate button */}
        <Button
          onClick={handleClickOpen}
          type="button"
          className="bg-[#E16F52] dark:bg-gray-400 px-6 py-3 mt-4 "
        >
          Donate Now
        </Button>
      </div>
      {/* payment modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            width: "800px",
            maxWidth: "90vw",
          },
        }}
      >
        <DialogTitle className="dark:bg-[#17191E] dark:text-white" sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Payment
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="dark:bg-[#262A33]">
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm handleClose={handleClose} item={item} setOpen={setOpen} refetch={refetch}></CheckoutForm>
            </Elements>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default DonationDetailsCard;
