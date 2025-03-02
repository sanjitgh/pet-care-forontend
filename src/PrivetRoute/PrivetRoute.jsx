import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonSingle from "../Skeleton/SkeletonSingle";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <SkeletonSingle></SkeletonSingle>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetRoute;
