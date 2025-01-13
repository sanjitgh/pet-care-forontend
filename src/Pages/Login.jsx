import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provaider/AuthProvaider";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const { handelLogin, handelGoogleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    handelLogin(email, password)
      .then((res) => {
        if (from) {
          navigate(from);
        }
      })
      .catch((error) => {
        toast.error("Invalid User!");
      });
  };

  //  google login
  const handelLoginWithGoogle = () => {
    handelGoogleLogin().then((res) => {
      const name = res.user.displayName;
      const image = res.user.photoURL;
      const email = res.user.email;
      const newUser = {
        name,
        image,
        email,
      };

      // save user info to the database
      axios.post("http://localhost:5000/user", newUser);

      if (location.state) {
        navigate(location.state);
      } else {
        navigate("/");
      }
    });
  };

  return (
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
          <p className="text-center text-white mb-8">- - - - - - OR - - - - - -</p>
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
            <p className="text-green-500 mb-2 mt-3">
              {errors.password.message}
            </p>
          )}

          <div className="form-control">
            <input
              type="submit"
              value="Login"
              className="bg-white px-8 py-2 cursor-pointer text-[#E16F52] mt-6"
            />
          </div>
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
  );
};

export default Login;
