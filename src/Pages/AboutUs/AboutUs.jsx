import { FaPaw, FaUsers, FaHeart, FaHandsHelping } from "react-icons/fa";
import img1 from "../../../src/assest/aboutUs/1.webp";
import img2 from "../../../src/assest/aboutUs/2.webp";
import img3 from "../../../src/assest/aboutUs/3.webp";
import { Helmet } from "react-helmet-async";
const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - PetCare</title>
      </Helmet>
      <section className="py-14 lg:py-20 dark:bg-[#030712]">
        <div className="container mx-auto px-2 text-gray-800">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#5F56C6] mb-6 dark:text-white">
              Welcome to PetCare
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Connecting pets with loving families, making adoption simple, and
              ensuring every pet finds a forever home.
            </p>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col md:flex-row items-center gap-5 bg-[#5F56C6] dark:bg-[#0D1323] p-10 rounded-lg shadow-lg">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-semibold text-white flex items-center gap-3">
                <FaPaw className="text-white" /> Our Mission
              </h2>
              <p className="mt-4 text-lg text-gray-200">
                We strive to create a world where every pet has a home by making
                the adoption process seamless and efficient.
              </p>
            </div>
            <img
              src={img2}
              alt="Mission"
              className="md:w-1/2 mt-6 md:mt-0 rounded-lg shadow-md"
            />
          </div>

          {/* Team Section */}
          <div className="mt-16 flex flex-col md:flex-row items-center gap-5">
            <img
              src={img1}
              alt="Team"
              className="md:w-1/2 rounded-lg shadow-md"
            />
            <div className="md:w-1/2 text-center md:text-left md:pl-10">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#5F56C6] flex items-center gap-3 dark:text-white">
                <FaUsers className="text-[#5F56C6] dark:text-white" /> Meet Our
                Team
              </h2>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                Our dedicated team of animal lovers and experts work tirelessly
                to ensure every pet finds the perfect home.
              </p>
            </div>
          </div>

          {/* Community Section */}
          <div className="mt-16 flex flex-col md:flex-row items-center gap-5 bg-[#5F56C6] dark:bg-[#0D1323] p-10 rounded-lg shadow-lg">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-semibold text-white flex items-center gap-3">
                <FaHeart className="text-white" /> Join Our Community
              </h2>
              <p className="mt-4 text-lg text-gray-200">
                Be a part of our growing community of pet lovers, volunteers,
                and adopters who make a difference every day.
              </p>
            </div>
            <img
              src={img1}
              alt="Community"
              className="md:w-1/2 mt-6 md:mt-0 rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
