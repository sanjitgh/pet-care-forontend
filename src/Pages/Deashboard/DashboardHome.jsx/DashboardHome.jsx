import React from "react";
import { Helmet } from "react-helmet-async";
import useRole from "../../../hook/useRole";
import DashboardDynamicData from "../DahboardDynamicData/DahboardDynamicData";
import DonationChart from "../DonationChart/DonationChart";

const DashboardHome = () => {
  const [role] = useRole();
  return (
    <>
      <Helmet>
        <title>Dashboard Home - PetCare</title>
      </Helmet>
      <div>
        {role === "admin" ? (
          <span className="text-center text-2xl text-[#5F56C6] dark:text-white">
            Admin Dashboard
          </span>
        ) : (
          <span className="text-2xl text-[#5F56C6] dark:text-white">
            User Dashboard
          </span>
        )}
      </div>
      <DashboardDynamicData></DashboardDynamicData>
      <DonationChart></DonationChart>
    </>
  );
};

export default DashboardHome;
