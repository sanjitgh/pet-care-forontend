import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { uploadImage } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import { LuFan } from "react-icons/lu";
import ReactQuill from "react-quill";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";

const options = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "bird", label: "Bird" },
];

const MyAddedPetUpdate = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: formData = [] } = useQuery({
    queryKey: ["formData", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pet/${id}`);
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: null,
    },
  });

  useEffect(() => {
    if (formData?.length > 0) {
      setValue("category", {
        value: formData[0]?.category,
        label: formData[0]?.category,
      });
    }
  }, [formData, setValue]);

  useEffect(() => {
    if (formData?.length > 0) {
      setValue("pet_description", formData[0]?.pet_description || "");
    }
  }, [formData, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.pet_image[0];
    const imageUrl = await uploadImage(image);
    const item = {
      name: data.name,
      age: data.age,
      location: data.location,
      pet_description: data.pet_description,
      pet_owner_description: data.pet_owner_description,
      category: data.category.value,
      image: imageUrl,
      adopted: "false",
      email: user?.email,
    };

    // send pet data in db
    axiosSecure.patch(`/update-pet/${id}`, item).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Pet Update Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-added-pet");
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Update Pet - PetCare</title>
      </Helmet>
      <div>
        <div className="max-w-3xl mx-auto p-10 bg-gray-50 dark:bg-[#030712]">
          <h1 className="md:text-5xl text-2xl text-center mb-14 dark:text-white">
            Update a Pet
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* name */}
            <input
              {...register("name", { required: true })}
              placeholder="Pet Name*"
              type="text"
              defaultValue={formData[0]?.name}
              className="w-full border outline-none p-2 dark:bg-transparent text-black dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500">Pet name is required</p>
            )}
            {/* age */}
            <input
              {...register("age", { required: true })}
              placeholder="Pet Age*"
              defaultValue={formData?.length > 0 ? formData[0]?.age : ""}
              type="number"
              className="w-full border outline-none p-2 dark:bg-transparent text-black dark:text-white"
            />
            {errors.age && <p className="text-red-500">Pet age is required</p>}
            {/* location */}
            <input
              {...register("location", { required: true })}
              placeholder="Pet Location*"
              defaultValue={formData?.length > 0 ? formData[0]?.location : ""}
              type="text"
              className="w-full border outline-none p-2 dark:bg-transparent text-black dark:text-white"
            />
            {errors.location && (
              <p className="text-red-500">Pet location is required</p>
            )}
            {/* pet owner sort description */}
            <textarea
              {...register("pet_owner_description", { required: true })}
              placeholder="Pet owner sort description*"
              defaultValue={
                formData?.length > 0 ? formData[0]?.pet_owner_description : ""
              }
              className="w-full border outline-none p-2 dark:bg-transparent text-black dark:text-white h-20"
            ></textarea>
            {errors.pet_owner_description && (
              <p className="text-red-500">Owner sort description is required</p>
            )}
            {/* pet description react quill*/}
            <Controller
              name="pet_description"
              control={control}
              rules={{ required: "Pet description is required" }}
              render={({ field }) => (
                <ReactQuill
                  {...field} // Spread the field props to connect with react-hook-form
                  theme="snow"
                  placeholder="Pet description*"
                  className="w-full outline-none h-28 mb-10 dark:bg-transparent dark:text-white"
                />
              )}
            />
            {errors.pet_description && (
              <p className="text-red-500">Pet description is required</p>
            )}
            {/* pet category */}
            <Controller
              name="category"
              control={control}
              defaultValue={null}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  placeholder="Select Category"
                  className="w-full"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "#eee" : "#eee",
                      boxShadow: state.isFocused ? "#eee" : "none",
                      padding: "2px",
                      outline: "none",
                      borderWidth: "2px",
                      borderRadius: "0.375rem",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused ? "#eee" : "white",
                      color: state.isFocused ? "black" : "black",
                      padding: "10px",
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor: "#aaa",
                        color: "white",
                      },
                    }),
                  }}
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
            {/* pet image */}
            <input
              type="file"
              {...register("pet_image", { required: true })}
              accept="image/*"
            />
            {errors.pet_image && (
              <p className="text-red-500">Pet image is required</p>
            )}
            {/* Submit Button */}
            <div>
              <Button className="bg-[#E16F52] dark:bg-gray-400">
                <span className="flex gap-1 items-center">
                  Add Pet{loading && <LuFan className="animate-spin" />}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyAddedPetUpdate;
