import { Divider } from "@mui/material";
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
          <Divider>
            <span className="text-center text-2xl md:text-5xl">
              Welcome to Admin Dashboard
            </span>
          </Divider>
        ) : (
          <Divider>
            <span className="text-center text-2xl md:text-5xl">
              Welcome to User Dashboard
            </span>
          </Divider>
        )}
      </div>
    </>
  );
};

export default DashboardHome;
