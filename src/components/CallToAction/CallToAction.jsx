import { Link } from "react-router-dom";
import img from "../../../src/assest/callToAction/happy.webp";
import img2 from "../../../src/assest/callToAction/happy2.webp";
const CallToAction = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-[#23272F] ">
      <div className="container mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Adopt, Don't Shop
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Every pet deserves a chance to be loved and cared for. By adopting,
            you’re not just changing a pet’s life—you’re transforming yours too.
          </p>
          <ul className="mt-6 space-y-2 text-gray-700 list-disc">
            <li className="ml-4"> Save lives and create a bond that lasts a lifetime.</li>
            <li className="ml-4"> Reduce animal homelessness one adoption at a time.</li>
            <li className="ml-4"> Make a positive impact in your community.</li>
          </ul>
          <Link to={'/pet-listing'}>
            <button className="mt-6 bg-[#E16F52] dark:bg-blue-gray-500 text-white px-6 py-3 rounded-lg text-lg transition">
              You Want Adopt?
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
          <img
            src={img}
            alt="Happy Dog with Adoptive Family"
            className="w-full rounded-xl"
          />
          <img
            src={img2}
            alt="Rescued Cat Being Hugged"
            className="w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
