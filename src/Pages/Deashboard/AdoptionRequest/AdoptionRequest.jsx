import { Helmet } from "react-helmet-async";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdoptionRequestCard from "../../../components/AdoptionRequestCard/AdoptionRequestCard";

const AdoptionRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // get adoption request
  const { data: adopReq = [], refetch } = useQuery({
    queryKey: ["adopReq", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`adoptionRequest/${user.email}`);
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Adoption Request - PetCare</title>
      </Helmet>
      <h1 className="text-2xl md:text-5xl text-center my-5">
        Adoption Request
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Pet Name</TableCell>
              <TableCell align="center">Requester Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adopReq.map((item) => (
              <AdoptionRequestCard
                key={item._id}
                item={item}
                refetch={refetch}
              ></AdoptionRequestCard>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdoptionRequest;
