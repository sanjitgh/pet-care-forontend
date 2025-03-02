import { Card, CardBody } from "@material-tailwind/react";
import { FaUsersGear } from "react-icons/fa6";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdCampaign, MdOutlinePets } from "react-icons/md";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { FaDonate } from "react-icons/fa";
const DashboardDynamicData = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  //   get user
  const { data: users = [] } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  //   get pets
  const { data: pets = [] } = useQuery({
    queryKey: ["Pets"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-pet");
      return data;
    },
  });

  //   get doantions
  const { data: allDonations = [] } = useQuery({
    queryKey: ["all-donations"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-donations");
      return data;
    },
  });

  //   get all donner data
  const { data: donationsHistory = [] } = useQuery({
    queryKey: ["donationHistory"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/donations-history");
      return data;
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
      <Card className="bg-[#5F56C6] dark:bg-[#030712] rounded">
        <CardBody>
          <div className="flex gap-5 md:gap-8 xl:gap-4 text-white">
            <FaUsersGear className="text-2xl md:text-6xl " />
            <div>
              <p className="text-xl">Total User</p>
              <span className="text-2xl">{users?.length}</span>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="bg-[#5F56C6] dark:bg-[#030712] rounded">
        <CardBody>
          <div className="flex gap-5 md:gap-8 xl:gap-4 text-white">
            <MdOutlinePets className="text-2xl md:text-6xl " />
            <div>
              <p className="text-xl">Total Pet</p>
              <span className="text-2xl">{pets?.length}</span>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="bg-[#5F56C6] dark:bg-[#030712] rounded">
        <CardBody>
          <div className="flex gap-5 md:gap-8 xl:gap-4 text-white">
            <MdCampaign className="text-2xl md:text-6xl" />
            <div>
              <p className="text-xl">Total Campaigns</p>
              <span className="text-2xl">{allDonations?.length}</span>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="bg-[#5F56C6] dark:bg-[#030712] rounded">
        <CardBody>
          <div className="flex gap-5 md:gap-8 xl:gap-4 text-white">
            <FaDonate className="text-2xl md:text-6xl" />
            <div>
              <p className="text-xl">Total Donate</p>
              <span className="text-2xl">{donationsHistory?.length}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardDynamicData;
