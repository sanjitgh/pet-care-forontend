import img from "../../assest/about.webp";

const About = () => {
  return (
    <section className="py-20 dark:bg-[#181A20] dark:text-white ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2  gap-10 px-2">
        <div>
          <h3 className="text-lg text-[#E16F52] dark:text-white ">About PetCare</h3>
          <h1 className="text-3xl md:text-5xl italic my-2">
            We're the Most Trusted Animal Rescue in Town
          </h1>
          <p className="text-xl mb-4 dark:text-gray-500 ">
            Our mission is to bridge the gap between compassionate individuals
            and animals looking for their forever homes.
          </p>
          <p className="text-gray-600" >
            At PetCare, we envision a world where every pet has a loving home.
            We’re committed to raising awareness about adoption and empowering
            communities to make a positive difference in the lives of animals.
            Join us in creating a world filled with wagging tails, purring
            companions, and endless love. Together, let’s give every pet the
            home they truly deserve.
          </p>
        </div>
        <div className="relative">
          <img className="w-full rounded-xl" src={img} alt="pet" />
          <h1 className="absolute top-0 right-0 bg-[#E16F52] dark:bg-blue-gray-500 p-5 flex flex-col text-white items-center rounded-bl-2xl">
            <span className="text-5xl">5+</span>
            <span className="text-lg italic">Years Expereince</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default About;
