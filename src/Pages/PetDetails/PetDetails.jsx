import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import PetDetailsCard from "../../components/PetDetailsCard/PetDetailsCard";

const PetDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: pet = [] } = useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pet/${id}`);
      return data;
    },
  });

  return (
    <>
      <div className="py-20 dark:bg-[#252933] min-h-[95vh]">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {pet.map((item) => (
              <PetDetailsCard key={item._id} item={item}></PetDetailsCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PetDetails;
