import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="pt-20  bg-white border-t text-black">
      <div className="md:px-10 mx-auto px-3">
        <div className="footer">
          <aside>
            <h1 className="logo text-gray-900 font-bold md:text-4xl text-2xl">
              ReviewSphere
            </h1>
            <p className="max-w-[350px] my-3">
            Your go-to source for honest reviews and expert recommendations. Reach out for support or collaboration.
            </p>
            <ul className="flex items-center gap-5">
              <li>
                <a
                  className="text-xl hover:text-gray-700 transition-all"
                  href={"https://www.facebook.com/"}
                  target="_blank"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  className="text-xl hover:text-gray-700 transition-all"
                  href={"https://www.twitter.com/"}
                  target="_blank"
                >
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a
                  className="text-xl hover:text-gray-700 transition-all"
                  href={"https://www.instagram.com/"}
                  target="_blank"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </aside>
          <nav>
            <h6 className="footer-title text-xl font-medium">Services</h6>
            <Link
              to={"/services"}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              Service
            </Link>
            <Link
              to={"/"}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              Newsletter
            </Link>
            <Link
              to={"/"}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              Blog
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title text-xl font-medium">Information</h6>
            <Link
              to={"/signup"}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              Login
            </Link>
            <Link
              to={""}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              About Us
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title text-xl font-medium">Security</h6>
            <Link
              to={""}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              Terms and Condition
            </Link>
            <Link
              to={""}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              Privacy Policy
            </Link>
            <Link
              to={""}
              className="text-base font-normal hover:text-gray-700 transition-all"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-t-green-50 mt-10 mb-0"></div>
      <div className="py-8">
        <p className="text-center font-medium">
          © 2024 Review Sphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
