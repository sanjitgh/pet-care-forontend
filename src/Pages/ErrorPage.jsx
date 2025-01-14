import { FaRegSadCry } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="bg-[#E16F52] h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-9xl text-white text-center flex justify-center">
          <TbError404 />
        </h1>
        <p className="text-white font-medium text-2xl flex gap-2 items-center -mt-3">
          Page not found! <FaRegSadCry />
        </p>
      </div>
      <div>
        <Link
          to={"/"}
          className="btn flex items-center gap-5 bg-transparent hover:bg-transparent text-white mt-10"
        >
          Back to Home <RiArrowGoBackFill />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
