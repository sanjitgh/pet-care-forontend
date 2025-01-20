import { Button } from "@material-tailwind/react";
import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/UseAxiosSecure";
const AllDonationCard = ({ item, refetch }) => {
  const { _id, petName, maxDonationAmount, status } = item;
  const axiosSecure = useAxiosSecure();
  const [pause, setPause] = useState(status === "paused");

  //   handle status pause or unpause
  const handleStatus = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `If you click confirm, the status will be ${
        pause ? "unpaused" : "paused"
      }!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = pause ? "unPaused" : "paused";

        axiosSecure
          .patch(`/donationStatus/${id}`, { status: newStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setPause(!pause);
              Swal.fire(
                "Success!",
                `Status updated to ${newStatus}.`,
                "success"
              );
              refetch();
            } else {
              Swal.fire(
                "Error!",
                "There was an issue updating the status. Please try again.",
                "error"
              );
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to update status.", "error");
          });
      }
    });
  };

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
        axiosSecure.delete(`/donations/${item._id}`).then((res) => {
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
  return (
    <TableRow sx={{ borderBottom: "1px solid #ddd" }}>
      <TableCell className="dark:text-white" align="center">{petName}</TableCell>
      <TableCell className="dark:text-white" align="center">${maxDonationAmount}</TableCell>
      <TableCell className="dark:text-white" align="center">
        <Link to={`/dashboard/all-donations/${_id}`}>
          <FaEdit className="text-[#F69585] text-xl mx-auto"></FaEdit>
        </Link>
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => handleStatus(_id)}
          className={pause ? "bg-green-500" : "bg-[#F69585] dark:bg-gray-400"}
        >
          {pause ? "Resume" : "Pause"}
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

export default AllDonationCard;
