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
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    petName,
    petImage,
    sortDescription,
    longDescription,
    donatedAmount,
    donationLastDate,
    postedDate,
    maxDonationAmount,
  } = item;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!user) navigate("/login");
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
          <p className="dark:text-gray-200">{sortDescription}</p>
        </div>

        <div>
          <img
            src={petImage}
            alt="pet image"
            className="w-full max-h-[600px] object-cover"
          />
        </div>

        <div className="my-5">
          <p className="my-5 text-[#676666] dark:text-gray-200 text-lg flex flex-col gap-2">
            <strong className="text-[#333333] text-xl dark:text-white">
              About Pet:{" "}
            </strong>{" "}
            {longDescription}
          </p>
        </div>

        <h3 className="capitalize text-xl font-semibold text-[#333333] dark:text-white">
          Information
        </h3>
        <div className="w-full h-[2px] bg-[#5F56C6] my-4"></div>

        {/* info */}
        <div className="grid grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold text-[#333333] dark:text-white">
              Todal Donation:
            </span>
            <span className="capitalize text-base text-[#5F56C6]">
              {donatedAmount}$
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold text-[#333333] dark:text-white">
              Need Money:
            </span>
            <span className="capitalize text-base text-[#5F56C6]">
              {maxDonationAmount}$
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold text-[#333333] dark:text-white">
              Posted Date:
            </span>
            <span className="capitalize text-base text-[#5F56C6]">
              {" "}
              <span>{format(new Date(postedDate), "PPP")}</span>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold text-[#333333] dark:text-white">
              Donation Last Date:
            </span>
            <span className="capitalize text-base text-[#5F56C6]">
              <span>{format(new Date(donationLastDate), "Pp")}</span>
            </span>
          </div>

          {/* donate button */}
          <Button
            onClick={handleClickOpen}
            type="button"
            className="bg-[#5A52BC] py-3 hover:bg-[#554DB2] rounded w-fit"
          >
            Donate Now
          </Button>
        </div>
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
        <DialogTitle
          className="dark:bg-[#17191E] dark:text-white"
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
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
              <CheckoutForm
                handleClose={handleClose}
                item={item}
                setOpen={setOpen}
                refetch={refetch}
              ></CheckoutForm>
            </Elements>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default DonationDetailsCard;
