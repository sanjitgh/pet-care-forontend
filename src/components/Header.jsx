import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FaUserTie } from "react-icons/fa";
import { GiJumpingDog } from "react-icons/gi";
import useAuth from "../hook/useAuth";
import { ThemeContext } from "../ThemeProvaider/ThemeProvaider";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, handelLogout } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "border-b-white border-b dark:text-blue-gray-400" : "dark:text-white"
        }
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "border-b-white border-b dark:text-blue-gray-400" : "dark:text-white"
        }
        to={"/pet-listing"}
      >
        Pet Listing
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "border-b-white border-b dark:text-blue-gray-400" : "dark:text-white"
        }
        to={"/donation-campaign"}
      >
        Donation Campaigns
      </NavLink>
      {!user && (
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-white border-b dark:text-blue-gray-400" : "dark:text-white"
          }
          to={"/login"}
        >
          Login
        </NavLink>
      )}
    </>
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    <AppBar
      className="py-2 dark:bg-[#181A20]"
      position="static"
      sx={{ background: "#e16f52" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"} className="flex items-center gap-1 md:mr-5">
              <GiJumpingDog className="text-5xl" />
              <span className="text-2xl md:text-4xl tracking-normal font-extrabold">
                Pet
                <span className="text-[#ffffff86] italic text-2xl">care</span>
              </span>
            </Link>
          </Typography>
          {/* mobile  */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              PaperProps={{
                sx: {
                  width: "200px",
                  backgroundColor: theme === "dark" ? "#252932" : "#e16f52",
                  marginTop: "15px",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <div className="flex flex-col gap-3 p-3">{links}</div>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"} className="flex items-center gap-3 md:mr-5">
              <GiJumpingDog className="text-5xl" />
              <span className="text-2xl md:text-4xl tracking-normal font-extrabold">
                Pet<span className="text-[#ffffff86] italic">care</span>
              </span>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div className="flex gap-5">{links}</div>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Click me!">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <img
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <FaUserTie className="text-3xl text-white" />
                )}
              </IconButton>
            </Tooltip>
            {/* profile dropdown */}
            <Menu
              PaperProps={{
                sx: {
                  width: "200px",
                  backgroundColor: theme === "dark" ? "#252932" : "#e16f52",
                  marginTop: "65px",
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
                  <ul className="text-center text-white flex flex-col gap-3">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <button onClick={logOut} className="cursor-pointer">
                        Logout
                      </button>
                    </li>
                    <li>
                      <button onClick={toggleTheme}>
                        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
                      </button>
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
                        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
