import useAxiosSecure from "../../../hook/UseAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const MyAddedPet = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myPet = [] } = useQuery({
    queryKey: ["myPet", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-pet/${user?.email}`);
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>My Pet - PetCare</title>
      </Helmet>
      <div>
        <div className="px-2">
          <h1 className="text-3xl md:text-5xl text-center mb-10">
            My Added Pets
          </h1>
        </div>
      </div>
    </>
  );
};

export default MyAddedPet;
