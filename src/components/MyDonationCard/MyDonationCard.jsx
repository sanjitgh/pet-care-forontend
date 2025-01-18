import { Avatar, Button } from "@material-tailwind/react";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/UseAxiosSecure";

const MyDonationCard = ({ item, refetch }) => {
  const { petImage, petName, donationAmount, _id } = item;
  const axiosSecure = useAxiosSecure();
  const handleRemove = (id) => {
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
        axiosSecure.delete(`/my-donations-remove/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `This item deleted successfully done!`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <TableRow key={item._id} sx={{ borderBottom: "1px solid #ddd" }}>
      <TableCell align="center">
        <Avatar src={petImage}></Avatar>
      </TableCell>
      <TableCell align="center">{petName}</TableCell>
      <TableCell align="center">${donationAmount}</TableCell>
      <TableCell align="center">
        <Button onClick={() => handleRemove(_id)} className="bg-[#F69585]">
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MyDonationCard;
