import { Button } from "@material-tailwind/react";
import { TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/UseAxiosSecure";

const AdoptionRequestCard = ({ item, refetch }) => {
  const { _id, petName, userName, userEmail, userPhone, userAddress, status } =
    item;
  const axiosSecure = useAxiosSecure();
  const [currentStatus, setCurrentStatus] = useState(status || "Pending");

  // Handle accept or reject status
  const handleStatus = (id, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this request as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/adoptionStatusRequests/${id}`, { status: newStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setCurrentStatus(newStatus);
              Swal.fire(
                "Success!",
                `The request status has been updated to ${newStatus}.`,
                "success"
              );
              refetch();
            } else {
              Swal.fire(
                "Error!",
                "Failed to update the status. Please try again.",
                "error"
              );
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
      <TableCell className="dark:text-white" align="center">
        {petName}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {userName}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {userEmail}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {userPhone}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {userAddress}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        {currentStatus}
      </TableCell>
      <TableCell className="dark:text-white" align="center">
        <Button
          onClick={() => handleStatus(_id, "Accepted")}
          className="bg-[#5F56C6] mx-1 p-2"
        >
          Accept
        </Button>
        <Button
          onClick={() => handleStatus(_id, "Rejected")}
          className="bg-red-500 mx-1 p-2"
        >
          Reject
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AdoptionRequestCard;
