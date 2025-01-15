import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { LuFan } from "react-icons/lu";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../../../api/utils";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const options = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "bird", label: "Bird" },
];

const AddPet = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.pet_image[0];
    const imageUrl = await uploadImage(image);
    const date = new Date();
    const petData = {
      name: data.name,
      age: data.age,
      location: data.location,
      pet_description: data.pet_description,
      pet_owner_description: data.pet_owner_description,
      category: data.category.value,
      image: imageUrl,
      date,
      adopted: "false",
      email: user?.email,
    };

    try {
      // send pet data in db
      const res = await axiosSecure.post("/pets", petData);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Pet Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/my-added-pet')
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Pet - PetCare</title>
      </Helmet>
      <div>
        <div className="border max-w-3xl mx-auto p-10 bg-gray-50">
          <h1 className="md:text-5xl text-2xl text-center mb-14">Add a Pet</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* name */}
            <input
              {...register("name", { required: true })}
              placeholder="Pet Name*"
              type="text"
              className="w-full border outline-none p-2"
            />
            {errors.name && (
              <p className="text-red-500">Pet name is required</p>
            )}
            {/* age */}
            <input
              {...register("age", { required: true })}
              placeholder="Pet Age*"
              type="number"
              className="w-full border outline-none p-2"
            />
            {errors.age && <p className="text-red-500">Pet age is required</p>}
            {/* location */}
            <input
              {...register("location", { required: true })}
              placeholder="Pet Location*"
              type="text"
              className="w-full border outline-none p-2"
            />
            {errors.location && (
              <p className="text-red-500">Pet location is required</p>
            )}
            {/* pet owner sort description */}
            <textarea
              {...register("pet_owner_description", { required: true })}
              placeholder="Pet owner sort description*"
              className="w-full border outline-none p-2 h-20"
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
                  className="w-full outline-none h-28 mb-10"
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
              <button
                className="text-white text-center mx-auto py-2 px-8 cursor-pointer bg-[#E16F52] mt-6"
                type="submit"
              >
                <span className="flex gap-1 items-center">
                  Add Pet{loading && <LuFan className="animate-spin" />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPet;
