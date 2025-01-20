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
import AllDonationCard from "../../../components/AllDonationCard/AllDonationCard";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allDonations = [], refetch } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/all-donations');
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>All Donation - PetCare</title>
      </Helmet>
      <h1 className="text-center text-2xl md:text-5xl mb-5 dark:text-white">All Donation</h1>
      <TableContainer sx={{ maxHeight: "600px" }} component={Paper} >
        <Table className="dark:bg-[#17191E]">
          <TableHead className="bg-[#F69585] dark:bg-[#17191E]">
            <TableRow>
              <TableCell align="center">
                <span className="text-white">Pet Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Maximum donation amount</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Edit</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Action</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Delete</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allDonations.map((item) => (
              <AllDonationCard
                key={item._id}
                item={item}
                refetch={refetch}
              ></AllDonationCard>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AllDonations;
