import { Divider } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

const DashboardHome = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Home - PetCare</title>
      </Helmet>
      <div>
        <Divider>
          <span className="text-center text-2xl md:text-5xl">
            Welcome to Dashboard
          </span>
        </Divider>
      </div>
    </>
  );
};

export default DashboardHome;
