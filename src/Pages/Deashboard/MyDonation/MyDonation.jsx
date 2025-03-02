import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import MyDonationCard from "../../../components/MyDonationCard/MyDonationCard";

const MyDonation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myDonationData = [], refetch } = useQuery({
    queryKey: ["myDonationData", user?.email || user?.providerData[0]?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-donations-history/${user?.email || user?.providerData[0]?.email}`
      );
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>My Donation - PetCare</title>
      </Helmet>
      <h1 className="text-center mb-5 text-2xl md:text-4xl dark:text-white">My Donations</h1>
      <TableContainer className="dark:bg-[#030711]" sx={{ maxHeight: "500px" }} component={Paper}>
        <Table>
          <TableHead className="bg-[#5F56C6] dark:bg-[#030711]">
            <TableRow>
              <TableCell align="center">
                <span className="text-white">Image</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Donation Amount</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myDonationData.map((item) => (
              <MyDonationCard key={item._id} item={item} refetch={refetch}></MyDonationCard>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyDonation;
