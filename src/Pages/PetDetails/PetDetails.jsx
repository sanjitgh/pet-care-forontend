import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import PetDetailsCard from "../../components/PetDetailsCard/PetDetailsCard";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";

const PetDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: pet = [] } = useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/pet/${id}`);
      return data;
    },
  });

  const handleCategoryClick = (category) => {
    console.log(category);
    navigate(`/pet-listing?filter=${category}`);
  };

  return (
    <>
      <div className="py-20 dark:bg-[#030712] min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Pet Details Section */}
            <div className="md:col-span-9 order-last md:order-first">
              {pet.map((item) => (
                <PetDetailsCard key={item._id} item={item} />
              ))}
            </div>
            {/* Sidebar */}
            <aside className="md:col-span-3 order-first md:order-last bg-[#5F56C6] dark:bg-[#0D1323] p-5 rounded text-white h-fit">
              <h2 className="text-2xl font-semibold mb-4">
                Filter By Category
              </h2>
              <ul className="space-y-2">
                <li className="cursor-pointer hover:text-gray-300">
                  <Link to={"/pet-listing"}>All Pet</Link>
                </li>
                <li
                  className="cursor-pointer hover:text-gray-300"
                  onClick={() => handleCategoryClick("bird")}
                >
                  Bird
                </li>
                <li
                  className="cursor-pointer hover:text-gray-300"
                  onClick={() => handleCategoryClick("cat")}
                >
                  Cat
                </li>
                <li
                  className="cursor-pointer hover:text-gray-300"
                  onClick={() => handleCategoryClick("dog")}
                >
                  Dog
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetDetails;
