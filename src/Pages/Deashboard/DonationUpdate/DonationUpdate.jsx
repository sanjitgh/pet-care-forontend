import { useState } from "react";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../api/utils";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import { LuFan } from "react-icons/lu";
import { Button } from "@material-tailwind/react";

const DonationUpdate = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();

  const { data: myData = {} } = useQuery({
    queryKey: ["defaultData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donations/${id}`);
      return data;
    },
  });

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

    const donationData = {
      donationLastDate: startDate,
      petName: data.name,
      maxDonationAmount: data.maxDonationAmount,
      sortDescription: data.sortDescription,
      longDescription: data.longDescription,
      petImage: imageUrl,
    };

    // update donation data in db
    axiosSecure.patch(`/donationsCampaign/${id}`, donationData).then((res) => {
      if (res.data.modifiedCount > 0) {
        setLoading(false);
        reset();
        navigate("/dashboard/all-donations");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Update Successfull!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Update Donation - PetCare</title>
      </Helmet>
      <div>
        <div className="max-w-3xl mx-auto p-10 bg-gray-50 dark:bg-[#030712]">
          <h1 className="md:text-5xl text-2xl text-center mb-14 dark:text-white">
            Update Donation
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* last Date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="dark:text-white">
                Donation Last Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full border outline-none p-2 dark:bg-transparent dark:text-white"
              />
            </div>

            {/* Pet Name */}
            <input
              {...register("name", { required: true })}
              placeholder="Pet Name*"
              type="text"
              className="w-full border outline-none p-2 dark:bg-transparent dark:text-white"
              defaultValue={myData[0]?.petName}
            />
            {errors.name && <p className="text-red-500">Name is required</p>}

            {/* max Donation amount */}
            <input
              {...register("maxDonationAmount", { required: true })}
              placeholder="Max donation amount*"
              type="number"
              className="w-full border outline-none p-2 dark:bg-transparent dark:text-white"
              defaultValue={myData[0]?.maxDonationAmount}
            />
            {errors.maxDonationAmount && (
              <p className="text-red-500">Max donation amount is required</p>
            )}

            {/* sort description */}
            <textarea
              {...register("sortDescription", { required: true })}
              placeholder="Sort description*"
              className="w-full border outline-none p-2 dark:bg-transparent dark:text-white h-20"
              defaultValue={myData[0]?.sortDescription}
            ></textarea>
            {errors.sortDescription && (
              <p className="text-red-500">Sort description is required</p>
            )}
            {/* long description */}
            <textarea
              {...register("longDescription", { required: true })}
              placeholder="Long description*"
              className="w-full border outline-none p-2 dark:bg-transparent dark:text-white h-28"
              defaultValue={myData[0]?.longDescription}
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
              <Button type="submit" className="bg-[#E16F52] dark:bg-gray-400">
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

export default DonationUpdate;
