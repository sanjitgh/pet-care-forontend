import React from "react";
import { Helmet } from "react-helmet-async";
import useRole from "../../../hook/useRole";

const DashboardHome = () => {
  const [role] = useRole();
  return (
    <>
      <Helmet>
        <title>Dashboard Home - PetCare</title>
      </Helmet>
      <div>
        {role === "admin" ? (
          <span className="text-center text-2xl dark:text-white">
            Admin Dashboard
          </span>
        ) : (
          <span className="text-2xl dark:text-white">User Dashboard</span>
        )}
      </div>
    </>
  );
};

export default DashboardHome;
