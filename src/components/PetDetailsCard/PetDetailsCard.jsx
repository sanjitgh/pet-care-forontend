import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import "./textCss.css";
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
import { Button } from "@material-tailwind/react";

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
      status: "Panding",
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

      <div className="shadow-lg  dark:bg-[#0D1323] p-5 md:p-10 md:pt-5 rounded">
        <h1 className="md:text-4xl text-2xl text-center text-[#333333] dark:text-white">
          {name}
        </h1>

        <div className="wrapper_des my-4">
          <div
            className="text-[#676666] dark:text-gray-200 text-[18px] mb-[0.8rem]"
            dangerouslySetInnerHTML={{
              __html: cleanedDescription,
            }}
          />
        </div>

        <div>
          <img
            className="w-full max-h-[600px] rounded"
            src={image}
            alt={name}
          />
        </div>

        <p className="my-5 text-[#676666] dark:text-gray-200 text-lg flex flex-col gap-2">
          <strong className="text-[#333333] text-xl dark:text-white">
            About Owner:{" "}
          </strong>{" "}
          {pet_owner_description}
        </p>
        <h3 className="capitalize text-xl font-semibold text-[#333333] dark:text-white">
          {category} Information
        </h3>
        <div className="w-full h-[2px] bg-[#5F56C6] my-4"></div>
        <div className="">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[#333333] dark:text-white">
                Location:
              </span>
              <span className="capitalize text-base text-[#5F56C6]">
                {location}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[#333333] dark:text-white">
                Category:
              </span>
              <span className="capitalize text-base text-[#5F56C6]">
                {category}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[#333333] dark:text-white">
                Age:
              </span>
              <span className="capitalize text-base text-[#5F56C6]">
                {age}Y
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[#333333] dark:text-white">
                Date:
              </span>
              <span className="capitalize text-base text-[#5F56C6]">
                {format(new Date(date), "P")}
              </span>
            </div>
          </div>

          <Button
            onClick={handleClickOpen}
            className="bg-[#5A52BC] py-3 tracking-wide hover:bg-[#554DB2] rounded mt-5"
          >
            Adopt Request
          </Button>
        </div>
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
        <DialogTitle
          className="dark:bg-[#0D1323] dark:text-white"
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
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
        <DialogContent className="dark:bg-[#0D1323] dark:text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 mb-5">
              {/* petId */}
              <p>
                <strong>Id :</strong> {_id}
              </p>

              {/* petName */}
              <p>
                <strong>Name :</strong> {name}
              </p>

              {/* petImg */}
              <p className="flex items-center gap-2">
                <strong>Image : </strong>{" "}
                <img src={image} alt="pet-img" className="w-10 h-10" />
              </p>
              {/* user name */}
              <div>
                <Tooltip title="You can't edit your name!" placement="top">
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    {...register("userName", { required: true })}
                    className="w-full border p-2 focus:outline focus:outline-0 dark:bg-transparent dark:text-white"
                    readOnly
                  />
                </Tooltip>
              </div>
              {/* user email */}
              <div>
                <Tooltip title="You can't edit your email!" placement="top">
                  <input
                    type="text"
                    defaultValue={user?.email || user?.providerData[0]?.email}
                    {...register("userEmail", { required: true })}
                    className="w-full border p-2 focus:outline focus:outline-0 dark:bg-transparent dark:text-white"
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
                  className="w-full border p-2 focus:outline focus:outline-0 dark:bg-transparent dark:text-white"
                  autocomplete="off"
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
                  className="w-full border p-2 focus:outline focus:outline-0 dark:bg-transparent dark:text-white "
                  autocomplete="off"
                />
                {errors.userAddress && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="bg-[#5A52BC] py-3 tracking-wide hover:bg-[#554DB2] rounded"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default PetDetailsCard;
