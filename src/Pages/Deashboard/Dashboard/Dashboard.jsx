import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { CiSignpostDuo1, CiSquareQuestion } from "react-icons/ci";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import { MdCampaign } from "react-icons/md";
import { SiMyget } from "react-icons/si";

const Deashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleMenuItemClick = () => {
    setIsSidebarOpen(false); // Close the sidebar
  };

  const links = (
    <>
      <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
        <NavLink
          to={"/dashboard/add-pet"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ff260071] text-white  flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2"
          }
        >
          <IoMdAddCircle />
          Add Pets
        </NavLink>
      </li>
      <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
        <NavLink
          to={"/dashboard/my-added-pet"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ff260071] text-white  flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2"
          }
        >
          <CiSignpostDuo1 />
          My added pets
        </NavLink>
      </li>
      <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
        <NavLink
          to={"/dashboard/adoption-request"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ff260071] text-white flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2"
          }
        >
          <CiSquareQuestion />
          Adoption Request
        </NavLink>
      </li>
      <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
        <NavLink
          to={"/dashboard/create-donation-campaign"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ff260071] text-white flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2"
          }
        >
          <TbBrandCampaignmonitor />
          Create Donation Campaign
        </NavLink>
      </li>
      <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
        <NavLink
          to={"/dashboard/my-donation-campaign"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ff260071] text-white flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2"
          }
        >
          <MdCampaign />
          My Donation Campaigns
        </NavLink>
      </li>
      <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
        <NavLink
          to={"/dashboard/my-donations"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#ff260071] text-white flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2"
          }
        >
          <SiMyget />
          My Donations
        </NavLink>
      </li>
    </>
  );

  return (
    <section className="flex min-h-screen">
      <div className="flex w-full relative">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen
              ? "fixed inset-0 w-full bg-gray-200 z-20"
              : "hidden md:hidden lg:block w-[20%] bg-gray-200"
          } p-4 transition-all duration-300`}
        >
          <h1 className="text-xl md:text-3xl font-bold mb-6 text-[#E16F52]">
            <Link to={"/dashboard"}>Dashboard</Link>
          </h1>
          <ul>{links}</ul>
          {isSidebarOpen && (
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={toggleSidebar}
            >
              Close
            </button>
          )}
        </aside>

        {/* Main content */}
        <main className="w-full lg:w-[80%] md:p-10 p-4">
          {/* Toggle Button */}
          <button
            className="md:block lg:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
          <Outlet></Outlet>
        </main>
      </div>
    </section>
  );
};

export default Deashboard;
