import { Button } from "@material-tailwind/react";
import { motion } from "motion/react";
import img1 from "../../../src/assest/bannerImg/banner1.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div
        className="bg-center bg-cover bg-no-repeat min-h-[80vh] sm:min-h-[calc(100vh-80px)] relative flex justify items-center"
        style={{
          backgroundImage: `url(${img1})`,
        }}
      >
        <div className="absolute inset-0 bg-black/0 dark:bg-black/90 md:dark:bg-black/80  flex  items-center justify-center"></div>
        <div className="container mx-auto px-2">
          <div className="z-10 text-white dark:text-gray-200 text-center md:text-start md:max-w-[650px] relative">
            <h1 className="font-semibold dark:text-white text-3xl sm:text-3xl md:text-4xl 2xl:text-6xl text-[#5F56C6]">
              Discover the Joy of Pet Adoption with PetCare
            </h1>
            <p className="text-[#333333] max-w-[800px] mx-auto my-4 md:my-8 sm:text-lg dark:text-gray-300">
              At PetCare, we connect loving families with pets in need. Explore
              our selection of adorable cats, dogs, and more, ready to fill your
              life with unconditional love and joy. Begin your adoption journey
              today!
            </p>
            <motion.div
              initial={{ translateY: -10 }}
              animate={{ translateY: 10 }}
              transition={{
                duration: 1.5,
                delay: 0,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Link to={"/pet-listing"}>
                <Button
                  className="bg-[#5A52BC] py-4 hover:bg-[#554DB2] rounded"
                  variant="filled"
                >
                  <span className="flex items-center gap-2">
                    Browse Pets Now
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
