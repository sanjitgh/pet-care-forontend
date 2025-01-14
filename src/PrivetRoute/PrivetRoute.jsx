import { Navigate, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useAuth from "../hook/useAuth";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[95vh]">
        <BeatLoader color={"#E16F52"} size={10} />
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
  }

  return children;
};

export default PrivetRoute;
