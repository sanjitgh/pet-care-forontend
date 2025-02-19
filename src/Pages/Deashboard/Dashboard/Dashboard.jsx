import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import {
  CiDark,
  CiLight,
  CiSignpostDuo1,
  CiSquareQuestion,
} from "react-icons/ci";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import { MdCampaign, MdOutlinePets } from "react-icons/md";
import { SiMyget } from "react-icons/si";
import { IoReturnDownBack } from "react-icons/io5";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { FaDonate, FaUsers } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import useRole from "../../../hook/useRole";
import { ThemeContext } from "../../../ThemeProvaider/ThemeProvaider";

const Deashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, isLoading] = useRole();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleMenuItemClick = () => {
    setIsSidebarOpen(false);
  };

  const links = (
    <>
      {role === "admin" && (
        <>
          <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
            <NavLink
              to={"/dashboard/users"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#5F56C6] dark:bg-[#262A34] text-white  flex gap-1 p-2 items-center"
                  : "flex gap-1 items-center p-2 dark:text-white "
              }
            >
              <FaUsers></FaUsers>
              Users
            </NavLink>
          </li>
          <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
            <NavLink
              to={"/dashboard/all-pets"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#5F56C6] dark:bg-[#262A34] text-white  flex gap-1 p-2 items-center"
                  : "flex gap-1 items-center p-2 dark:text-white"
              }
            >
              <MdOutlinePets />
              All Pets
            </NavLink>
          </li>
          <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
            <NavLink
              to={"/dashboard/all-donations"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#5F56C6] dark:bg-[#262A34] text-white  flex gap-1 p-2 items-center"
                  : "flex gap-1 items-center p-2 dark:text-white"
              }
            >
              <FaDonate></FaDonate>
              All Donation
            </NavLink>
          </li>
        </>
      )}
      <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
        <NavLink
          to={"/dashboard/add-pet"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#5F56C6] dark:bg-[#262A34] text-white  flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2 dark:text-white"
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
              ? "bg-[#5F56C6] dark:bg-[#262A34] text-white  flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2 dark:text-white"
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
              ? "bg-[#5F56C6] dark:bg-[#262A34] text-white flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2 dark:text-white"
          }
        >
          <CiSquareQuestion />
          Adoption Request
        </NavLink>
      </li>
      <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
        <NavLink
          to={"/dashboard/create-donation"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#5F56C6] dark:bg-[#262A34] text-white flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2 dark:text-white"
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
              ? "bg-[#5F56C6] dark:bg-[#262A34] text-white flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2 dark:text-white"
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
              ? "bg-[#5F56C6] dark:bg-[#262A34] text-white flex gap-1 p-2 items-center"
              : "flex gap-1 items-center p-2 dark:text-white"
          }
        >
          <SiMyget />
          My Donations
        </NavLink>
      </li>

      {/* home menu for sm device and hidden for large device */}

      <div className="w-full h-[2px] bg-blue-gray-100 my-10 block md:hidden"></div>
      <div className="block md:hidden">
        <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#5F56C6] dark:bg-[#262A34] text-white flex gap-1 p-2 items-center"
                : "flex gap-1 items-center p-2 dark:text-white"
            }
          >
            <IoReturnDownBack />
            Back Home
          </NavLink>
        </li>
        <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
          <NavLink
            to={"/pet-listing"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#5F56C6] dark:bg-[#262A34] text-white flex gap-1 p-2 items-center"
                : "flex gap-1 items-center p-2 dark:text-white"
            }
          >
            <MdOutlinePets />
            Pet Listing
          </NavLink>
        </li>
        <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
          <NavLink
            to={"/donation-campaign"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#5F56C6] dark:bg-[#262A34] text-white flex gap-1 p-2 items-center"
                : "flex gap-1 items-center p-2 dark:text-white"
            }
          >
            <FaDonate></FaDonate>
            Donation Campaign
          </NavLink>
        </li>
        <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
          <NavLink
            to={"/dashboard/profile"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#5F56C6] dark:bg-[#262A34] text-white flex gap-1 p-2 items-center"
                : "flex gap-1 items-center p-2 dark:text-white"
            }
          >
            <CgProfile />
            Profile
          </NavLink>
        </li>
        <li className="mb-2 cursor-pointer" onClick={handleMenuItemClick}>
          <button onClick={toggleTheme}>
            {theme === "dark" ? (
              <div className="flex items-center pl-2 gap-2 text-white">
                <CiLight />
                Light Mode
              </div>
            ) : (
              <div className="flex items-center pl-2 gap-2">
                <CiDark />
                Dark Mode
              </div>
            )}
          </button>
        </li>
      </div>
    </>
  );

  return (
    <section className="flex min-h-screen">
      <div className="flex w-full relative">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen
              ? "fixed inset-0 w-full bg-gray-200 dark:bg-[#17191E] z-20 overflow-y-scroll"
              : "hidden md:hidden lg:block w-[20%] bg-gray-200 dark:bg-[#030712]"
          } p-4 transition-all duration-300`}
        >
          <h1 className="text-xl dark:text-white md:text-3xl font-bold mb-6 text-[#5F56C6]">
            <Link to={"/dashboard"}>Dashboard</Link>
          </h1>
          <ul>{links}</ul>
          {isSidebarOpen && (
            <IoMdClose
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-xl text-gray-600"
            />
          )}
        </aside>

        {/* Main content */}
        <main className="w-full lg:w-[80%] md:p-10 p-4 dark:bg-[#0D1323]">
          {/* Toggle Button */}
          <div className="flex items-center justify-between mb-5 md:hidden">
            <h1 className="font-bold text-xl text-[#5F56C6] ">Dashboard</h1>
            <RxHamburgerMenu
              onClick={toggleSidebar}
              className="text-lg dark:text-white"
            />
          </div>

          <DashboardHeader></DashboardHeader>
          <Outlet></Outlet>
        </main>
      </div>
    </section>
  );
};

export default Deashboard;
