import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import { uploadImage } from "../api/utils";
import { LuFan } from "react-icons/lu";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

const SignUp = () => {
  const { createUser, manageProfile, user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handelSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    // send the image to imgbb server
    const imageUrl = await uploadImage(image);
    if (password.length < 6) {
      return toast.error("You need at least 6 character.");
    }
    if (!/.*[a-z].*/.test(password)) {
      return toast.error("You need at least one lowercase letter.");
    }
    if (!/.*[A-Z].*/.test(password)) {
      return toast.error("You need at least one uppercase letter.");
    }
    setLoading(true);

    createUser(email, password)
      .then((res) => {
        manageProfile(name, imageUrl).then(async (res) => {
          setUser({
            ...user,
            displayName: name,
            photoURL: imageUrl,
            email: email,
          });
          // save user info to the database
          const newUser = {
            name: name,
            image: imageUrl,
            email: email,
          };

          await axiosPublic.post("/users", {
            ...newUser,
            role: "user",
          });
          navigate("/");
          toast.success("Register Successfull!");
        });
      })
      .catch((error) => {
        toast.error("This email already used.");
        setLoading(false);
      });
  };

  return (
    <div className="py-14 md:py-20 min-h-[calc(100vh-80px)] flex justify-center items-center bg-gray-50 dark:bg-[#030712] ">
      <div className="bg-[#5F56C6] dark:bg-[#0D1323]  max-w-[600px] p-0 py-10 md:p-16">
        <h1 className="text-center text-white font-semibold text-2xl md:text-5xl mb-8">
          Register Now
        </h1>
        <form onSubmit={handelSignUp} className=" px-3">
          <input
            name="name"
            type="text"
            autoComplete="off"
            placeholder="full name"
            className="w-full bg-transparent border mb-5 p-3 rounded placeholder:text-white outline-none text-white"
            required
          />

          <input
            name="email"
            type="email"
            autoComplete="off"
            placeholder="email"
            className="w-full bg-transparent border mb-5 p-3 rounded placeholder:text-white outline-none text-white"
            required
          />
          <input
            name="password"
            type="password"
            autoComplete="off"
            placeholder="password"
            className="w-full bg-transparent border mb-5 p-3 rounded placeholder:text-white outline-none text-white"
            required
          />

          <input name="image" type="file" required accept="image/*" />

          <div>
            <Button
              type="submit"
              className="bg-white text-[#5F56C6] dark:text-[#0D1323] py-3 tracking-wide rounded mt-5"
            >
              <span className="flex gap-1 items-center">
                Register{loading && <LuFan className="animate-spin" />}
              </span>
            </Button>
          </div>
          <div className="mt-3">
            <p className="text-white">
              Already have an account?{" "}
              <Link to={"/login"}>
                <b>Login</b>{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
