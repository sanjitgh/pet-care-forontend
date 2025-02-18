import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PiArrowUpRightBold } from "react-icons/pi";
import imgLogo from "../../src/assest/footer.png";
const Footer = () => {
  return (
    <footer className="pt-16 text-gray-300 bg-[#5F56C6] dark:bg-[#181A20] overflow-hidden relative">
      <div className="container mx-auto px-3 flex flex-col md:flex-row gap-14 md:gap-10 items-end">
        {/* left item */}
        <div className="w-full md:w-[40%]">
          <h1 className="text-white font-semibold text-3xl sm:text-3xl md:text-[40px] !leading-tight mb-5">
            Join Our Communities On Social Networks
          </h1>
          <ul className="flex items-center gap-5">
            <li className="p-2 rounded-full hover:scale-[1.1] duration-300 bg-[#1877F2]">
              <a
                className="text-xl transition-all"
                href={"https://www.facebook.com/"}
                target="_blank"
              >
                <FaFacebookF />
              </a>
            </li>
            <li className="p-2 rounded-full hover:scale-[1.1] duration-300 bg-[#1DA1F2]">
              <a
                className="text-xl transition-all"
                href={"https://www.twitter.com/"}
                target="_blank"
              >
                <FaXTwitter />
              </a>
            </li>
            <li className="p-2 rounded-full hover:scale-[1.1] duration-300 bg-[#962fbf]">
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
        {/* right item */}
        <div className="w-full md:w-[60%]">
          <ul className="flex items-center md:justify-end flex-wrap pb-3 uppercase text-white gap-5 border-b-[2px] border-white">
            <li>
              <Link className="flex items-center gap-2">
                Home <PiArrowUpRightBold className="text-xl" />
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-2">
                Pet Listing <PiArrowUpRightBold className="text-xl" />
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-2">
                Donation Campaigns <PiArrowUpRightBold className="text-xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* logo image */}
      <div className="pt-10 md:pt-14 mx-auto max-w-[300px] sm:max-w-[500px] lg:max-w-[800px] 2xl:max-w-[1200px]  -mb-4 sm:-mb-7 lg:-mb-14  2xl:-mb-20">
        <img className="w-full" src={imgLogo} alt="footer logo" />
      </div>
    </footer>
  );
};

export default Footer;
