import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provaider/AuthProvaider";
import toast from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const { createUser, manageProfile, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const password = form.password.value;

    const newUser = {
      name,
      image,
      email,
    };

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
          // save user info to the database
          axios.post("https://backend-sigma-tawny.vercel.app/user", newUser);
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error("This email already used.");
      });
  };

  return (
    <div className="py-20 min-h-[95vh] flex justify-center items-center bg-gray-50">
      <div className="container mx-auto px-3">
        <div className="card border md:p-10 p-5 max-w-[650px] mx-auto shadow-lg shadow-green-50">
          <h1 className="text-center text-black font-semibold text-2xl md:text-5xl mb-8">
            Sign Up Form
          </h1>
          <form onSubmit={handelSignUp} className=" px-3">
            <div className="form-control">
              <label className="label">
                <span className="text-gray-700">Name</span>
              </label>
              <input
                name="name"
                type="text"
                autoComplete="off"
                placeholder="name"
                className="input input-bordered bg-transparent placeholder:text-gray-300 text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-black">Photo URL</span>
              </label>
              <input
                name="image"
                type="text"
                autoComplete="off"
                placeholder="your-image.com"
                className="input input-bordered bg-transparent placeholder:text-gray-300 text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-black">Email</span>
              </label>
              <input
                name="email"
                type="email"
                autoComplete="off"
                placeholder="email"
                className="input input-bordered bg-transparent placeholder:text-gray-300 text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-black">Password</span>
              </label>
              <input
                name="password"
                type="password"
                autoComplete="off"
                placeholder="password"
                className="input input-bordered bg-transparent placeholder:text-gray-300 text-black"
                required
              />
            </div>

            <div className="mt-4">
              <p>
                Already have an account?{" "}
                <Link to={"/login"}>
                  <b>Login</b>{" "}
                </Link>
              </p>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-green-500 border-white hover:bg-green-600 text-white text-base font-medium">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
