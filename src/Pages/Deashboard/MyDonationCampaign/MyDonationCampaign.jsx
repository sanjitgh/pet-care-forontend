import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import useAuth from "../../../hook/useAuth";

const MyDonationCampaign = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myDonations = [] } = useQuery({
    queryKey: ["myDonations"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-donation/${user?.email}`);
      return data;
    },
  });
  console.log(myDonations);
  return <div></div>;
};

export default MyDonationCampaign;
