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
    <div className="py-20 min-h-[95vh] bg-gray-50 flex justify-center items-center">
      <div className="container mx-auto px-3">
        <div className="card border md:p-10 p-5 max-w-[650px] mx-auto shadow-lg shadow-green-50">
          <h1 className="text-cente text-center font-semibold text-2xl md:text-5xl mb-8">
            Login Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="px-3 text-black">
            <div className="form-control">
              <label className="label">
                <span className="text-black">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                autoComplete="off"
                placeholder="email"
                className="input input-bordered bg-transparent placeholder:text-gray-400 text-black"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-black">Password</span>
              </label>
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
                className="input input-bordered bg-transparent placeholder:text-gray-400 text-black"
              />
            </div>
            {errors.password && (
              <p className="text-green-500 mb-2 mt-3">
                {errors.password.message}
              </p>
            )}
            <label className="label">
              <a href="#" className="text-black">
                Forgot password?
              </a>
            </label>

            <div className="my-3">
              {/* <h3 className="text-lg font-medium mb-3">Socail Link</h3> */}
              <Link
                onClick={handelLoginWithGoogle}
                className="text-base flex items-center gap-3"
              >
                Login With Google
                <img
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="metamask"
                  className="h-6 w-6"
                />
              </Link>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn bg-green-500 border-white hover:bg-green-600 text-white text-base font-medium"
                variant="filled"
              >
                Login
              </button>
            </div>
            <div className="mt-4">
              <p>
                Are you new here?
                <Link to={"/register"}>
                  <b> Register</b>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
