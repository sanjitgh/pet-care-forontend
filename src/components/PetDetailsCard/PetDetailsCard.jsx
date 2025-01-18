import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import "./textCss.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import { Tooltip } from "@mui/material";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const PetDetailsCard = ({ item }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    name,
    email,
    image,
    age,
    category,
    date,
    location,
    pet_description,
    pet_owner_description,
    _id,
  } = item;

  //   react hook form code
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   modify the pet description
  const cleanedDescription = useMemo(() => {
    if (pet_description) {
      return pet_description.slice(0, -1);
    }
    return "";
  }, [pet_description]);

  const onSubmit = async (data) => {
    const adoptData = {
      petId: _id,
      hostEmail: email,
      petName: name,
      petImage: image,
      userName: data?.userName,
      userEmail: data?.userEmail,
      userPhone: data?.userPhone,
      userAddress: data?.userAddress,
    };

    try {
      // submit data in db
      const { data } = await axiosSecure.post("/adoptionRequest", adoptData);
      if (data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your request has been send!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (err) {
    } finally {
      handleClose();
      reset();
    }
  };

  return (
    <>
      <Helmet>
        <title>{name} - PetCare</title>
      </Helmet>
      <div className="bg-[#E16F52]">
        <div className="md:p-10 p-4 text-white">
          <h1 className="md:text-4xl text-2xl">{name}</h1>
          <div className="wrapper_des">
            <div
              dangerouslySetInnerHTML={{
                __html: cleanedDescription,
              }}
            />
          </div>
          {/* pet info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-2">
              <span className="bg-white w-20 text-center text-black p-2 text-xs rounded">
                CATEGORY
              </span>
              <span className="capitalize text-xl italic">{category}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="bg-white w-20 text-center text-black p-2 text-xs rounded">
                AGE
              </span>
              <span className="capitalize text-xl italic">{age}Y</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="bg-white w-20 text-center text-black p-2 text-xs rounded">
                LOCATION
              </span>
              <span className="capitalize text-xl italic">{location}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="bg-white w-20 text-center text-black p-2 text-xs rounded">
                DATE
              </span>
              <span className="capitalize text-lg italic text-center">
                {format(new Date(date), "Pp")}
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] bg-white mt-5"></div>
          <p className="my-5">
            <strong>Owner Description:</strong> {pet_owner_description}
          </p>

          <button
            onClick={handleClickOpen}
            className="text-white border-white border text-center py-2 px-8 cursor-pointer bg-transparent mt-6"
          >
            <span className="flex gap-1 items-center">Adopt</span>
          </button>
        </div>
      </div>
      <div className="order-first md:order-last">
        <img
          className="w-full max-h-[550px] md:sticky md:top-0"
          src={image}
          alt={name}
        />
      </div>

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
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {name}
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
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 mb-5">
              {/* petId */}
              <p>
                <strong>Pet Id:</strong> {_id}
              </p>

              {/* petName */}
              <p>
                <strong>Pet Name:</strong> {name}
              </p>

              {/* petImg */}
              <p className="flex items-center gap-2">
                <strong>Pet Image:</strong>{" "}
                <img src={image} alt="pet-img" className="w-10 h-10" />
              </p>
              {/* user name */}
              <div>
                <Tooltip title="You can't edit your name!" placement="top">
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    {...register("userName", { required: true })}
                    className="w-full border p-2 focus:outline focus:outline-0"
                    readOnly
                  />
                </Tooltip>
              </div>
              {/* user email */}
              <div>
                <Tooltip title="You can't edit your email!" placement="top">
                  <input
                    type="text"
                    defaultValue={user?.email}
                    {...register("userEmail", { required: true })}
                    className="w-full border p-2 focus:outline focus:outline-0"
                    readOnly
                  />
                </Tooltip>
              </div>
              {/* user phone */}
              <div>
                <input
                  type="number"
                  placeholder="Phone Number"
                  {...register("userPhone", { required: true })}
                  className="w-full border p-2 focus:outline focus:outline-0"
                />
                {errors.userPhone && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
              {/* user address */}
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("userAddress", { required: true })}
                  className="w-full border p-2 focus:outline focus:outline-0 "
                />
                {errors.userAddress && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                backgroundColor: "#E16F52",
                border: "none",
                color: "white",
                "&:hover": {
                  backgroundColor: "#D05A2B",
                },
              }}
            >
              submit
            </Button>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default PetDetailsCard;
