import { Button } from "@material-tailwind/react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import imgOurApp from "../../../src/assest/ourApp.webp";
const OurApp = () => {
  return (
    <div className="py-14 md:py-20 bg-[#F5F5F5] dark:bg-[#030712]">
      <div className="bg-white rounded border p-3 xl:py-10 xl:px-5 md:flex items-center justify-between container mx-auto dark:bg-[#0D1323] dark:border-[#5A52BC]">
        <div className="flex-shrink-0">
          <img
            src={imgOurApp}
            alt="App Preview"
            className="w-36 md:w-72 xl:w-96 h-auto"
          />
        </div>
        <div className="ml-6 flex-grow">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#5A52BC] mb-2">
            Download Our App
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Adopt and care for pets easily with the PetCare app! Browse
            available pets, track adoptions, and get expert care tips—all in one
            place. Stay updated with instant notifications and make pet adoption
            seamless. Download now and find your perfect companion!
          </p>
          <div className="mt-4">
            <a href="https://play.google.com" target="_blank">
              <Button
                className="bg-[#5A52BC] py-3 tracking-wide hover:bg-[#554DB2] rounded flex items-center gap-2"
                variant="filled"
              >
                <IoLogoGooglePlaystore />
                Download on App Store
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurApp;
