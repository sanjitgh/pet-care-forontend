import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[95vh] overflow-x-hidden">
        <div className="flex justify-center items-center min-h-[95vh] ">
          <SkeletonTheme
            baseColor="rgba(173, 216, 230, 0.1)"
            highlightColor="rgba(173, 216, 230, 0.3)"
          >
            <div className="w-full min-h-screen flex justify-center items-center">
              <div className="w-full">
                <Skeleton count={25} width={1920} height={30} />
              </div>
            </div>
          </SkeletonTheme>
        </div>
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
