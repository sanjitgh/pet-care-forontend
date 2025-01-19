import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hook/useAxiosPublic";
import { LuFan } from "react-icons/lu";
import { FaGithub, FaYahoo } from "react-icons/fa6";
import useAuth from "../hook/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { handelLogin, handelGoogleLogin, handelYahooLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    handelLogin(email, password)
      .then((res) => {
        if (from) navigate(from);
        toast.success("Login Successfull!");
      })
      .catch((error) => {
        toast.error("Invalid User!");
        setLoading(false);
      });
  };

  //  google login
  const handelLoginWithGoogle = () => {
    handelGoogleLogin().then(async (res) => {
      // save user info to the database
      const newUser = {
        name: res.user.displayName,
        image: res.user.photoURL,
        email: res.user.email,
      };

      await axiosPublic.post("/users", {
        ...newUser,
        role: "user",
      });
      if (from) navigate(from);
      toast.success("Login Successfull!");
    });
  };

  //  yahoo login
  const handelLoginWithYahoo = () => {
    console.log("click");
    handelYahooLogin()
    .then(async (res) => {
      // save user info to the database
      const newUser = {
        name: res.user.displayName,
        image: res.user.photoURL,
        email: res.user.providerData[0].email,
      };

      await axiosPublic.post("/users", {
        ...newUser,
        role: "user",
      });
      toast.success("Login Successfull!");
      if (from) navigate(from);
    });
  };

  return (
    <>
      <Helmet>
        <title>Login - PetCare</title>
      </Helmet>
      <div className="py-20 min-h-[95vh] flex justify-center items-center bg-gray-50">
        <div className="bg-[#E16F52] w-[600px] p-16">
          <h1 className="text-white text-center font-semibold text-2xl md:text-5xl mb-8">
            Join PetCare
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="px-3 text-black">
            {/* social login */}
            <div className="mb-8">
              <Link
                onClick={handelLoginWithGoogle}
                className="text-base flex items-center gap-3 w-full text-center border justify-center p-3 rounded-xl text-white"
              >
                <img
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="metamask"
                  className="h-6 w-6"
                />
                Continue With Google
              </Link>
            </div>
            <div className="mb-8">
              <Link
                onClick={handelLoginWithYahoo}
                className="text-base flex items-center gap-3 w-full text-center border justify-center p-3 rounded-xl text-white"
              >
                <FaYahoo className="h-6 w-6"></FaYahoo>
                Continue With Yahoo
              </Link>
            </div>
            <p className="text-center text-white mb-8">
              - - - - - - OR - - - - - -
            </p>
            {/* social login */}
            <input
              {...register("email", { required: true })}
              type="email"
              autoComplete="off"
              placeholder="email"
              className="w-full bg-transparent border mb-5 p-3 rounded-lg placeholder:text-white outline-none text-white"
            />

            <input
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password length must be 6 character",
                },
              })}
              type="password"
              autoComplete="off"
              placeholder="password"
              className="w-full bg-transparent border p-3 rounded-lg placeholder:text-white outline-none text-white"
            />

            {errors.password && (
              <p className="text-white mb-2 mt-3">{errors.password.message}</p>
            )}

            <button
              className="bg-white text-center mx-auto py-2 px-8 cursor-pointer text-[#E16F52] mt-6"
              type="submit"
            >
              <span className="flex gap-1 items-center">
                Login{loading && <LuFan className="animate-spin" />}
              </span>
            </button>
            <div className="mt-4">
              <p className="text-white">
                Are you new here?
                <Link to={"/register"}>
                  <b> Register</b>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
