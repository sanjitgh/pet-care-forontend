import { useNavigate } from "react-router-dom";
import img1 from "../../../src/assest/category/c1.webp";
import img2 from "../../../src/assest/category/c2.webp";
import img3 from "../../../src/assest/category/c3.webp";
import { Button } from "@material-tailwind/react";

const PetCategory = () => {
  const categories = [
    { name: "cat", image: img1 },
    { name: "dog", image: img2 },
    { name: "bird", image: img3 },
  ];

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/pet-listing?filter=${category}`);
  };

  return (
    <section className="py-14 xl:py-20 dark:bg-[#181A20]">
      <div className="container mx-auto px-2">
        <h2 className="text-2xl md:text-4xl text-[#5F56C6] dark:text-white font-bold mb-10">
          Popular Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto px-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#23272F] shadow rounded overflow-hidden hover:shadow-md transition-shadow relative"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full rounded object-cover "
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold capitalize dark:text-white text-[#333333] mb-4">
                  {category.name}
                </h3>
                <Button
                  onClick={() => handleCategoryClick(category.name)}
                  className="bg-[#5A52BC] py-3 w-24 hover:bg-[#554DB2] rounded"
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCategory;
