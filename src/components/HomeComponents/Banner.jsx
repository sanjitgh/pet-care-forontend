import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Button } from "@material-tailwind/react";
import { motion } from "motion/react";
import img1 from "../../../src/assest/bannerImg/banner1.webp";
import img2 from "../../../src/assest/bannerImg/banner2.webp";
import img3 from "../../../src/assest/bannerImg/banner3.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div
            className="bg-center bg-cover bg-no-repeat min-h-[800px] relative flex justify-center items-center"
            style={{
              backgroundImage: `url(${img1})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50 dark:bg-black/80  flex items-center justify-center"></div>
            <div className="z-10 text-white dark:text-gray-200 text-center">
              <h1 className="font-bold dark:text-gray-400 md:text-5xl text-2xl mb-5">
                Discover the Joy of Pet Adoption with PetCare
              </h1>
              <p className="text-gray-300 max-w-[800px] mx-auto">
                At PetCare, we connect loving families with pets in need.
                Explore our selection of adorable cats, dogs, and more, ready to
                fill your life with unconditional love and joy. Begin your
                adoption journey today!
              </p>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
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
                    className="bg-[#e16f52] py-4 dark:bg-gray-700 hover:bg-[#e16f52] rounded-none mt-6"
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
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="bg-center bg-cover bg-no-repeat min-h-[800px] relative flex justify-center items-center"
            style={{
              backgroundImage: `url(${img2})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50 dark:bg-black/80 flex items-center justify-center"></div>
            <div className="z-10 text-white dark:text-gray-200 text-center">
              <h1 className="font-bold dark:text-gray-400 md:text-5xl text-2xl mb-5">
                Change Lives, One Adoption at a Time
              </h1>
              <p className="text-gray-300 max-w-[800px] mx-auto">
                Every pet deserves a loving home, and every adoption changes a
                life. Find your perfect companion and give them the forever home
                they’ve been waiting for. Start today with PetCare.
              </p>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
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
                    className="bg-[#e16f52] py-4 dark:bg-gray-700 hover:bg-[#e16f52] rounded-none mt-6"
                    variant="filled"
                  >
                    <span className="flex items-center gap-2">Adopt Today</span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="bg-center bg-cover bg-no-repeat min-h-[800px] relative flex justify-center items-center"
            style={{
              backgroundImage: `url(${img3})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50 dark:bg-black/80 flex items-center justify-center"></div>
            <div className="z-10 text-white dark:text-gray-200 text-center">
              <h1 className="font-bold dark:text-gray-400 md:text-5xl text-2xl mb-5">
                YTogether, We Can Make a Difference
              </h1>
              <p className="text-gray-300 max-w-[800px] mx-auto">
                PetCare is more than a platform—it’s a community of animal
                lovers dedicated to helping pets in need. Adopt, donate, or
                volunteer to support our mission and create a brighter future
                for all pets.
              </p>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Link to={"/donation-campaign"}>
                  <Button
                    className="bg-[#e16f52] py-4 dark:bg-gray-700 hover:bg-[#e16f52] rounded-none mt-6"
                    variant="filled"
                  >
                    <span className="flex items-center gap-2">
                      Get Involved
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
