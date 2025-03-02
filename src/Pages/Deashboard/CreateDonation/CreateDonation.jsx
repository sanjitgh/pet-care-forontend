import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { LuFan } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uploadImage } from "../../../api/utils";
import { Button } from "@material-tailwind/react";

const CreateDonation = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.petImage[0];
    const imageUrl = await uploadImage(image);
    const date = new Date();

    const donationData = {
      donationLastDate: startDate,
      postedDate: date,
      maxDonationAmount: data.maxDonationAmount,
      sortDescription: data.sortDescription,
      longDescription: data.longDescription,
      petImage: imageUrl,
      petName: data.name,
      donatedAmount: "0",
      donator: user?.displayName,
      donationCreator: user?.email,
      status: "unPaused",
    };

    try {
      // send donation data in db
      const res = await axiosSecure.post("/donationsCampaign", donationData);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Donation Campaign Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-donation-campaign");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      reset();
    }
  };
  return (
    <>
      <Helmet>
        <title>Create Donation - PetCare</title>
      </Helmet>
      <div>
        <div className="max-w-3xl mx-auto p-10  dark:bg-[#030711]">
          <h1 className="md:text-4xl text-2xl text-center mb-14 dark:text-white">
            Add a Donation
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 "
          >
            {/* last Date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="dark:text-white mb-2">
                Donation Last Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full dark:text-gray-400 border outline-none p-2 dark:bg-[#0D1222]"
              />
            </div>

            {/* Pet Name */}
            <input
              {...register("name", { required: true })}
              placeholder="Pet Name*"
              type="text"
              className="w-full border outline-none p-2 dark:bg-[#0D1222]"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}

            {/* max Donation amount */}
            <input
              {...register("maxDonationAmount", { required: true })}
              placeholder="Max donation amount*"
              type="number"
              className="w-full border outline-none p-2 dark:bg-[#0D1222]"
            />
            {errors.maxDonationAmount && (
              <p className="text-red-500">Max donation amount is required</p>
            )}

            {/* sort description */}
            <textarea
              {...register("sortDescription", { required: true })}
              placeholder="Sort description*"
              className="w-full border outline-none p-2 dark:bg-[#0D1222] h-20"
            ></textarea>
            {errors.sortDescription && (
              <p className="text-red-500">Sort description is required</p>
            )}
            {/* long description */}
            <textarea
              {...register("longDescription", { required: true })}
              placeholder="Long description*"
              className="w-full border outline-none p-2 dark:bg-[#0D1222] h-28"
            ></textarea>
            {errors.longDescription && (
              <p className="text-red-500">Long description is required</p>
            )}

            {/* petImage */}
            <input
              type="file"
              {...register("petImage", { required: true })}
              accept="image/*"
            />
            {errors.petImage && (
              <p className="text-red-500">Pet image is required</p>
            )}
            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="bg-[#5A52BC] py-3 hover:bg-[#554DB2] rounded"
              >
                <span className="flex gap-1 items-center">
                  Create Donation
                  {loading && <LuFan className="animate-spin" />}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateDonation;
