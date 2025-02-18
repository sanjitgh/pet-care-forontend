import img from "../../assest/about.webp";

const About = () => {
  return (
    <section className="py-20 dark:bg-[#030712] dark:text-white ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2  gap-10  px-2">
        {/* left item */}
        <div>
          <h3 className="text-lg xl:text-xl text-[#5F56C6] dark:text-white ">
            About PetCare
          </h3>
          <h1 className="text-3xl md:text-5xl italic my-2 text-[#333333] dark:text-white">
            We're the Most Trusted Animal Rescue in Town
          </h1>
          <p className="text-xl mb-5 dark:text-gray-300 text-[#333333]">
            Our mission is to bridge the gap between compassionate individuals
            and animals looking for their forever homes.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            At PetCare, we envision a world where every pet has a loving home.
            We’re committed to raising awareness about adoption and empowering
            communities to make a positive difference in the lives of animals.
            Join us in creating a world filled with wagging tails, purring
            companions, and endless love. Together, let’s give every pet the
            home they truly deserve.
          </p>
        </div>
        {/* right item */}
        <div className="relative">
          <img className="w-full max-h-[450px] object-cover rounded" src={img} alt="pet" />
          <h1 className="absolute top-0 right-0 bg-[#5F56C6] dark:bg-[#0D1323] p-5 flex flex-col text-white items-center rounded-bl-xl rounded-tr">
            <span className="text-5xl">5+</span>
            <span className="text-lg italic">Years Expereince</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default About;
