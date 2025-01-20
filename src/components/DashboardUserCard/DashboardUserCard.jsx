import { Avatar, Button } from "@material-tailwind/react";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/UseAxiosSecure";

const DashboardUserCard = ({ item, refetch }) => {
  const { _id, image, name, email, role } = item;
  const axiosSecure = useAxiosSecure();
  const handleRole = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Promote the user to make an admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Comfirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user-role/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Admin update successfull!",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">
        <Avatar alt="Profile" src={image} />
      </TableCell>
      <TableCell className="dark:text-white" align="center">{name}</TableCell>
      <TableCell className="dark:text-white" align="center">{email}</TableCell>
      <TableCell className="dark:text-white" align="center">
        {role === "admin" ? (
          <Button disabled className="capitalize bg-[#F69585] dark:bg-gray-400">
            {role}
          </Button>
        ) : (
          <Button onClick={() => handleRole(_id)} className="bg-[#3c3c3c]">
            User
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default DashboardUserCard;
