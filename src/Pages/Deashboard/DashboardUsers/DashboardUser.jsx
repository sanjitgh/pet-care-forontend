import { Helmet } from "react-helmet-async";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import DashboardUserCard from "../../../components/DashboardUserCard/DashboardUserCard";

const DashboardUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Users - PetCare</title>
      </Helmet>
      <h1 className="text-2xl md:text-4xl text-center mb-8 dark:text-white">
        All User
      </h1>
      <TableContainer
        className="dark:bg-[#17191E]"
        component={Paper}
        sx={{ maxHeight: "600px" }}
      >
        <Table>
          <TableHead className="bg-[#5F56C6] dark:bg-[#030712]">
            <TableRow>
              <TableCell align="center">
                <span className="text-white">Profile</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Email</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white">Role</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <DashboardUserCard
                key={item._id}
                item={item}
                refetch={refetch}
              ></DashboardUserCard>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashboardUser;
