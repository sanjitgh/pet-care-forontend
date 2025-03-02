import { Box, Button, Divider, IconButton, Menu, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../ThemeProvaider/ThemeProvaider";
import useAuth from "../../../hook/useAuth";

const DashboardHeader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, handelLogout } = useAuth();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    handelLogout();
    setAnchorElUser(null);
    navigate("/");
  };
  return (
    <header className="mb-7 hidden lg:block text-[#5F56C6] dark:text-white">
      <div className="flex gap-10 item-center justify-between">
        <ul className="flex items-center justify-end gap-8">
          <li>
            <Link to={"/"}>Back Home</Link>
          </li>
          <li>
            <Link to={"/pet-listing"}>Pet Listing</Link>
          </li>
          <li>
            <Link to={"/donation-campaign"}>Donation Campaign</Link>
          </li>
        </ul>

        <Box>
          <Tooltip title="Click me!">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <img
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            </IconButton>
          </Tooltip>
          {/* profile dropdown */}
          <Menu
            className="mt-[57px] md:mt-14 xl:mt-16"
            PaperProps={{
              sx: {
                width: "150px",
                backgroundColor: theme === "dark" ? "#030712" : "#5F56C6",
                padding: "10px",
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user ? (
              <>
                <ul className="text-white flex flex-col gap-3 pl-3">
                  <li>
                    <Link to={"/dashboard/profile"}>Profile</Link>
                  </li>
                  <li>
                    <button onClick={toggleTheme}>
                      {theme === "dark" ? "Light" : "Dark"} Mode
                    </button>
                  </li>
                  <Divider className="!bg-white"></Divider>
                  <li>
                    <Button
                      onClick={logOut}
                      className="cursor-pointer !bg-white dark:!bg-[#0D1323] w-full dark:text-white !py-1"
                      size="sm"
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="text-center text-white flex flex-col gap-3">
                  <li>
                    <Link to={"/login"} onClick={handleCloseUserMenu}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to={"/register"} onClick={handleCloseUserMenu}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <button onClick={toggleTheme}>
                      {theme === "dark" ? "Light" : "Dark"} Mode
                    </button>
                  </li>
                </ul>
              </>
            )}
          </Menu>
        </Box>
      </div>
    </header>
  );
};

export default DashboardHeader;
