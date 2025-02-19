import { Helmet } from "react-helmet-async";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import AllPetsCard from "../../../components/AllPetsCard/AllPetsCard";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const AllPets = () => {
  const axiousPublic = useAxiosPublic();
  const { data: allPets = [], refetch } = useQuery({
    queryKey: ["all-pet"],
    queryFn: async () => {
      const { data } = await axiousPublic.get("/all-pet");
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>All Pet - PetCare</title>
      </Helmet>
      <div>
        <h1 className="text-2xl md:text-4xl text-center mb-8 dark:text-white">
          All Pets
        </h1>
        <TableContainer
          className="dark:bg-[#17191E]"
          sx={{ maxHeight: "600px" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#5F56C6] dark:bg-[#030712]">
              <TableRow>
                <TableCell align="center">
                  <span className="text-white">Image</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white">Name</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white">Age</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white">Category</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white">Location</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white">Adoption Status</span>
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
              {allPets.map((item) => (
                <AllPetsCard
                  key={item._id}
                  item={item}
                  refetch={refetch}
                ></AllPetsCard>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AllPets;
