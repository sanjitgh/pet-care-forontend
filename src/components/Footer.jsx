import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="pt-20 text-gray-300 bg-[#e16f52]">
      <div className="md:px-10 container mx-auto px-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h1 className="text-white font-bold md:text-4xl text-2xl">
              PetCare
            </h1>
            <p className="max-w-[350px] my-3">
              Your go-to source for honest reviews and expert recommendations.
              Reach out for support or collaboration.
            </p>
            <ul className="flex items-center gap-5">
              <li>
                <a
                  className="text-xl transition-all"
                  href={"https://www.facebook.com/"}
                  target="_blank"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  className="text-xl transition-all"
                  href={"https://www.twitter.com/"}
                  target="_blank"
                >
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a
                  className="text-xl transition-all"
                  href={"https://www.instagram.com/"}
                  target="_blank"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
          <nav>
            <h6 className="text-white text-xl font-medium">Services</h6>
            <div className="flex flex-col mt-3">
              <Link className="text-base font-normal transition-all">
                Service
              </Link>
              <Link className="text-base font-normal transition-all">
                Newsletter
              </Link>
              <Link className="text-base font-normal transition-all">Blog</Link>
            </div>
          </nav>
          <nav>
            <h6 className="text-white text-xl font-medium">Security</h6>
            <div className="flex flex-col mt-3">
              <Link className="text-base font-normal transition-all">
                Terms and Condition
              </Link>
              <Link to={""} className="text-base font-normal transition-all">
                Privacy Policy
              </Link>
              <Link to={""} className="text-base font-normal transition-all">
                Contact Us
              </Link>
            </div>
          </nav>
          <nav>
            <h6 className="text-white text-xl font-medium">Information</h6>
            <div className="flex flex-col mt-3">
              <Link
                to={"/register"}
                className="text-base font-normal transition-all"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="text-base font-normal transition-all"
              >
                Login
              </Link>
              <Link className="text-base font-normal transition-all">
                About Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="border-t border-t-[#dddddd41] mt-10 mb-0"></div>
      <div className="py-8">
        <p className="text-center font-medium text-white">
          © 2025 PetCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
