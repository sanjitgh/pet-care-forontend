import img from "../../../src/assest/funfact.webp";

const FunFact = () => {
  return (
    <section
      className="py-20 lg:py-32 bg-no-repeat bg-center bg-cover relative"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute w-full h-full bg-black top-0 opacity-20 dark:opacity-80"></div>
      <div className="container mx-auto px-2 z-10 relative">
        <div className="md:max-w-[50%] text-white">
          <h3 className="text-lg text-white"> Fun Facts About Pets</h3>
          <h1 className="text-4xl xl:text-5xl mb-4 mt-1">
            Interesting Facts About Pet Care
          </h1>
          <p className="dark:text-gray-300 text-gray-200">
            Did you know that pets can lower stress and improve heart health?
            Studies show that spending time with a pet can reduce anxiety and
            increase happiness. Dogs have been known to detect certain diseases,
            while cats can find their way home using the Earth's magnetic
            fields. No matter the pet, caring for them brings joy and
            companionship to our lives! Stay tuned for more fun pet facts!
          </p>
          <div className="flex items-center justify-between gap-4 mt-10 sm:mt-16">
            <h1 className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl italic font-bold text-[#5F56C6]">
                70+
              </span>
              <span className="text-md sm:text-lg dark:text-gray-300">
                Successful <br /> Rescue
              </span>
            </h1>
            <h1 className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl italic font-bold text-[#5F56C6]">
                102+
              </span>
              <span className="text-md sm:text-lg dark:text-gray-300">
                Dedicated <br /> Volunteer
              </span>
            </h1>
            <h1 className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl italic font-bold text-[#5F56C6]">
                $55k+
              </span>
              <span className="text-md sm:text-lg dark:text-gray-300">
                Food & Product <br /> Donations
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunFact;
