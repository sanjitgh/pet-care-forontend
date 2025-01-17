import { Button } from "@material-tailwind/react";
import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/UseAxiosSecure";

const MyDonationCampaignTable = ({ item, refetch }) => {
  const { _id, petName, maxDonationAmount, status } = item;
  const axiosSecure = useAxiosSecure();
  const [pause, setPause] = useState(status === "paused");
  refetch();
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

  return (
    <TableRow key={item._id} sx={{ borderBottom: "1px solid #ddd" }}>
      <TableCell align="center">{petName}</TableCell>
      <TableCell align="center">${maxDonationAmount}</TableCell>
      <TableCell align="center">
        <div className={`w-full h-2 bg-gray-700 rounded relative`}>
          <div
            className={`w-1/2 h-2 rounded bg-red-300 absolute top-0 left-0`}
          ></div>
        </div>
      </TableCell>
      <TableCell align="center">
        <Link to={`/dashboard/my-donation-campaign/${_id}`}>
          <FaEdit className="text-[#F69585] text-xl mx-auto"></FaEdit>
        </Link>
      </TableCell>
      <TableCell align="center">
        <Button className="bg-[#F69585]">Donator </Button>
      </TableCell>
      <TableCell align="center">
        <Button onClick={() => handleStatus(_id)} className="bg-[#F69585]">
          {pause ? "Resume" : "Pause"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MyDonationCampaignTable;
