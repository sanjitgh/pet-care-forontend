import img from "../../../src/assest/funfact.webp";

const FunFact = () => {
  return (
    <section
      className="py-32 bg-no-repeat bg-center bg-cover relative bg-fixed"
      style={{ backgroundImage: `url(${img})` }}
    >
        <div className="absolute w-full h-full bg-black top-0 opacity-60"></div>
      <div className="container mx-auto px-2 z-10 relative">
        <div className="md:max-w-[50%] text-white">
          <h3 className="text-lg">Fun Facts About PetCare</h3>
          <h1 className="text-3xl md:text-5xl my-5">Fun Facts About PetCare</h1>
          <p>
            At PetCare, we celebrate the joy pets bring to our lives and love
            sharing fascinating tidbits about the animal kingdom. Ready to
            welcome one of these fascinating creatures into your home? Explore
            the world of adoption with PetCare and create your own memorable pet
            stories!
          </p>
          <div className="flex items-center justify-between gap-4 mt-16">
            <h1 className="flex flex-col items-center">
              <span className="text-5xl italic font-bold text-[#e74d26]">70+</span>
              <span className="text-lg">Successful <br /> Rescue</span>
            </h1>
            <h1 className="flex flex-col items-center">
              <span className="text-5xl italic font-bold text-[#e74d26]">166+</span>
              <span className="text-lg">Dedicated <br /> Volunteer</span>
            </h1>
            <h1 className="flex flex-col items-center">
              <span className="text-5xl italic font-bold text-[#e74d26]">$2M+</span>
              <span className="text-lg">Food & Product <br /> Donations</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunFact;
