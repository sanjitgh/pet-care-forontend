import img1 from "../../../src/assest/donner/Sponsor_1.webp";
import img2 from "../../../src/assest/donner/Sponsor_2.webp";
import img3 from "../../../src/assest/donner/Sponsor_3.webp";
import img4 from "../../../src/assest/donner/Sponsor_4.webp";

const Donner = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-2">
        <div className="grid gird-cols-2 md:gap-3 gap-10 sm:grid-cols-3 md:grid-cols-5 place-items-center border py-14 px-8 bg-gray-50">
          <div>
            <h1 className="text-3xl font-semibold italic">Our Sponsors and Donors</h1>
          </div>
          <img className="max-w-[150px]" src={img1} alt="" />
          <img className="max-w-[150px]" src={img2} alt="" />
          <img className="max-w-[150px]" src={img3} alt="" />
          <img className="max-w-[150px]" src={img4} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Donner;
