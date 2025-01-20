import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet-async";
import MyDonationCampaignTable from "./MyDonationCampaignTable";

const MyDonationCampaign = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myDonations = [], refetch } = useQuery({
    queryKey: ["myDonations", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-donation/${user?.email}`);
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>My Donation - PetCare</title>
      </Helmet>
      <h1 className="text-center mb-5 text-2xl md:text-5xl dark:text-white">
        My Donation Campaign
      </h1>
      <TableContainer
        className="dark:bg-[#17191E]"
        sx={{ maxHeight: "500px" }}
        component={Paper}
      >
        <Table>
          <TableHead className="bg-[#F69585] dark:bg-[#17191E]">
            <TableRow>
              <TableCell align="center">
                <span className="text-white">Pet Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Maximum donation amount</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Donation progress bar</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Edit</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Donators</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myDonations.map((item) => (
              <MyDonationCampaignTable
                key={item._id}
                item={item}
                refetch={refetch}
              ></MyDonationCampaignTable>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyDonationCampaign;
