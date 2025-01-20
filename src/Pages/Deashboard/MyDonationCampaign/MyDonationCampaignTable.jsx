import { Button } from "@material-tailwind/react";
import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MyDonationCampaignTable = ({ item, refetch }) => {
  const { _id, petName, maxDonationAmount, status, donatedAmount } = item;
  const axiosSecure = useAxiosSecure();
  const [pause, setPause] = useState(status === "paused");
  refetch();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // handle status paused or unpaused
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

  // get all donator for my donation campaign
  const { data: donners = [] } = useQuery({
    queryKey: ["donners", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/campaign-donation-data/${user?.email}`
      );
      return data;
    },
  });
  console.log(item);
  return (
    <>
      <TableRow key={item._id} sx={{ borderBottom: "1px solid #ddd" }}>
        <TableCell className="dark:text-white" align="center">
          {petName}
        </TableCell>
        <TableCell className="dark:text-white" align="center">
          ${maxDonationAmount}
        </TableCell>
        <TableCell className="dark:text-white" align="center">
          <div className="w-full h-2 bg-gray-700 rounded relative">
            <div
              className="h-2 rounded bg-[#F69585] absolute top-0 left-0"
              style={{
                width: `${(donatedAmount / maxDonationAmount) * 100}%`,
                transition: "width 0.5s ease",
              }}
            ></div>
          </div>
        </TableCell>
        <TableCell align="center">
          <Link to={`/dashboard/my-donation-campaign/${_id}`}>
            <FaEdit className="text-[#F69585] text-xl mx-auto"></FaEdit>
          </Link>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={handleClickOpen}
            className="bg-[#F69585] dark:bg-gray-400"
          >
            Donator{" "}
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={() => handleStatus(_id)}
            className="bg-[#F69585] dark:bg-gray-400"
          >
            {pause ? "Resume" : "Pause"}
          </Button>
        </TableCell>
      </TableRow>

      {/* donator list modal */}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          All Donor
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-[#F69585] border-b border-gray-200">
                    <th className="py-3 px-4 text-center text-white font-semibold">
                      Serial
                    </th>
                    <th className="py-3 px-4 text-center text-white font-semibold">
                      Pet Name
                    </th>
                    <th className="py-3 px-4 text-center text-white font-semibold">
                      Donor Name
                    </th>
                    <th className="py-3 px-4 text-center text-white font-semibold">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donners.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="text-center py-3 px-4">{idx + 1}</td>
                      <td className="text-center py-3 px-4">{item.petName}</td>
                      <td className="text-center py-3 px-4">
                        {item.paymentUser}
                      </td>
                      <td className="text-center py-3 px-4">
                        ${item.donationAmount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default MyDonationCampaignTable;
