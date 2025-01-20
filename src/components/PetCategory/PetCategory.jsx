import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img1 from "../../../src/assest/category/c1.webp";
import img2 from "../../../src/assest/category/c2.webp";
import img3 from "../../../src/assest/category/c3.webp";

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
    <div className="py-20 dark:bg-[#181A20] ">
      <h2 className="text-2xl md:text-5xl text-[#E16F52] dark:text-white font-bold mb-16 text-center max-w-[500px] mx-auto">
        <Divider>Pet Category</Divider>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto px-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#23272F] shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 rounded-md object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold capitalize dark:text-white">{category.name}</h3>
              <button
                onClick={() => handleCategoryClick(category.name)}
                className="mt-2 bg-[#E16F52] dark:bg-blue-gray-500 dark: text-white px-4 py-2 rounded-md"
              >
                View 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetCategory;
