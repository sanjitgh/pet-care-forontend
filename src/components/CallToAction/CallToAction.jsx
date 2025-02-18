import { Link } from "react-router-dom";
import img from "../../../src/assest/callToAction/happy.webp";
import img2 from "../../../src/assest/callToAction/happy2.webp";
import { Button } from "@material-tailwind/react";
const CallToAction = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-[#23272F] ">
      <div className="container mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center">
        {/* left item */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl xl:text-5xl text-[#333333] font-semibold text-gray-800 dark:text-white">
            Adopt, Don't Shop
          </h1>
          <p className="text-lg text-gray-600 mt-4 dark:text-gray-100">
            Every pet deserves a chance to be loved and cared for. By adopting,
            you’re not just changing a pet’s life—you’re transforming yours too.
          </p>
          <ul className="my-6 space-y-2 text-gray-700 list-disc dark:text-gray-300">
            <li className="ml-4">
              {" "}
              Save lives and create a bond that lasts a lifetime.
            </li>
            <li className="ml-4">
              {" "}
              Reduce animal homelessness one adoption at a time.
            </li>
            <li className="ml-4"> Make a positive impact in your community.</li>
          </ul>
          <Link to={"/pet-listing"}>
            <Button className="bg-[#5A52BC] py-4 hover:bg-[#554DB2] rounded">
              You Want Adopt?
            </Button>
          </Link>
        </div>
        {/* right item */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
          <img
            src={img}
            alt="Happy Dog with Adoptive Family"
            className="w-full rounded"
          />
          <img
            src={img2}
            alt="Rescued Cat Being Hugged"
            className="w-full rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
