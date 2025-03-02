import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const FeaturedPet = () => {
  const axiousPublic = useAxiosPublic();
  const { data: allPets = [], refetch } = useQuery({
    queryKey: ["all-pet"],
    queryFn: async () => {
      const { data } = await axiousPublic.get("/all-pet");
      return data;
    },
  });
  console.log(allPets);
  return (
    <section className="py-14 xl:py-20 dark:bg-[#030712]">
      <div className="container mx-auto px-2">
        <h2 className="text-2xl md:text-4xl text-[#5F56C6] dark:text-white font-bold mb-16">
          Featured Pets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto">
          {allPets.slice(0, 3).map((item) => (
            <Card className="rounded dark:bg-[#0D1323]" key={item._id}>
              <CardHeader color="blue-gray" className="relative rounded dark:shadow-none">
                <img className="w-full" src={item.image} alt="card-image" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white">
                  {item.name}
                </Typography>
                <Typography className="dark:text-gray-300">
                  <span className="font-semibold">Location: </span>{" "}
                  {item.location}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/pet-listing/${item?._id}`}>
                  <Button className="bg-[#5A52BC] py-3 tracking-wide hover:bg-[#554DB2] rounded w-full">
                    Read More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPet;
