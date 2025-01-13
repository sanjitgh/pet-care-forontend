import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";
import { Button } from "@mui/material";
import { useState } from "react";

const SignUp = () => {
  const { createUser, manageProfile, user, setUser } = useAuth();
  const navigate = useNavigate();
  const handelSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      return toast.error("You need at least 6 character.");
    }
    if (!/.*[a-z].*/.test(password)) {
      return toast.error("You need at least one lowercase letter.");
    }
    if (!/.*[A-Z].*/.test(password)) {
      return toast.error("You need at least one uppercase letter.");
    }

    createUser(email, password)
      .then((res) => {
        manageProfile(name, image).then((res) => {
          setUser({
            ...user,
            displayName: name,
            photoURL: image,
            email: email,
          });
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error("This email already used.");
      });
  };

  return (
    <div className="py-20 min-h-[95vh] flex justify-center items-center bg-gray-50">
      <div className="bg-[#E16F52] w-[600px] p-16">
        <h1 className="text-center text-white font-semibold text-2xl md:text-5xl mb-8">
          Sign Up Form
        </h1>
        <form onSubmit={handelSignUp} className=" px-3">
          <input
            name="name"
            type="text"
            autoComplete="off"
            placeholder="name"
            className="w-full bg-transparent border mb-5 p-3 rounded-lg placeholder:text-white outline-none text-white"
            required
          />

          <input
            name="email"
            type="email"
            autoComplete="off"
            placeholder="email"
            className="w-full bg-transparent border mb-5 p-3 rounded-lg placeholder:text-white outline-none text-white"
            required
          />
          <input
            name="password"
            type="password"
            autoComplete="off"
            placeholder="password"
            className="w-full bg-transparent border mb-5 p-3 rounded-lg placeholder:text-white outline-none text-white"
            required
          />

          <input
            onChange={(e) => setPreview(e.target)}
            type="file"
            required
            accept="image/*"
          />

          <div className="mt-2">
            <p className="text-white">
              Already have an account?{" "}
              <Link to={"/login"}>
                <b>Login</b>{" "}
              </Link>
            </p>
          </div>
          <input
            type="submit"
            value="Register"
            className="bg-white px-8 py-2 cursor-pointer text-[#E16F52] mt-6"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
