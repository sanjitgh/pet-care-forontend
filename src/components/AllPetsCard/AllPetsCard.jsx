import { Avatar, Button } from "@material-tailwind/react";
import { TableCell, TableRow } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";

const AllPetsCard = ({ item, refetch }) => {
  const { image, name, age, category, location, adopted } = item;
  const axiosSecure = useAxiosSecure();

  // handle delete
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/pets/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `${item.name} deleted successfully done!`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // handle adopted status
  const handleAdoptedChange = (item) => {
    const newStatus = adopted === "false" ? "true" : "false";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this pet as ${
        newStatus === "true" ? "Adopted" : "Unadopted"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/pets/${item._id}`, { adopted: newStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated!",
                showConfirmButton: false,
                timer: 1500,
                text: `The pet has been marked as ${
                  newStatus === "true" ? "Adopted" : "Unadopted"
                }.`,
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        borderBottom: "1px solid #ddd",
      }}
    >
      <TableCell align="center">
        <Avatar src={image}></Avatar>
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {name}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {age}Y
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {category}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {location}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {adopted === "false" ? (
          <span className="bg-[#5F56C6] text-white rounded p-1">Unadopted</span>
        ) : (
          <span className="bg-black text-white rounded p-1">Adopted</span>
        )}
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          className={
            adopted === "false"
              ? "bg-[#5F56C6] p-2 rounded"
              : "bg-[#5F56C6] p-2 rounded"
          }
          onClick={() => handleAdoptedChange(item)}
        >
          {adopted === "false" ? "Mark Adopted" : "Mark Unadopted"}
        </Button>
      </TableCell>
      <TableCell align="center">
        <FaTrash
          onClick={() => handleDelete(item)}
          className="mx-auto text-red-500 text-xl cursor-pointer"
        ></FaTrash>
      </TableCell>
    </TableRow>
  );
};

export default AllPetsCard;
