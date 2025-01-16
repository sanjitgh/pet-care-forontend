import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import DonationDetailsCard from "../../components/DonationDetailsCard/DonationDetailsCard";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: donationItem = [] } = useQuery({
    queryKey: ["donationItem", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donations/${id}`);
      return data;
    },
  });

  return (
    <>
      <div className="py-16">
        <div className="max-w-screen-xl mx-auto px-2">
          {donationItem.map((item) => (
            <DonationDetailsCard
              key={item._id}
              item={item}
            ></DonationDetailsCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default DonationDetails;
