import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DonationDetailsCard from "../../components/DonationDetailsCard/DonationDetailsCard";
import useAxiosPublic from "../../hook/useAxiosPublic";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: donationItem = [], refetch } = useQuery({
    queryKey: ["donationItem", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/donations/${id}`);
      return data;
    },
  });

  return (
    <>
      <div className="py-16 dark:bg-[#030712] dark:text-white">
        <div className="max-w-screen-xl mx-auto px-2">
          {donationItem.map((item) => (
            <DonationDetailsCard
              key={item._id}
              item={item}
              refetch={refetch}
            ></DonationDetailsCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default DonationDetails;
