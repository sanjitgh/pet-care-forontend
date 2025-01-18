import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useRole from "../../hook/useRole";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) {
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

  if (role === "admin") return children;
  return <Navigate to={'/dashboard'}></Navigate>
};

export default AdminRoute;
