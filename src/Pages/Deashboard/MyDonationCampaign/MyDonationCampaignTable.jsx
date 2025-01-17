import { Button } from "@material-tailwind/react";
import { TableCell, TableRow } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyDonationCampaignTable = ({ item }) => {
  const { _id, petName, maxDonationAmount } = item;
  return (
    <TableRow key={item._id} sx={{ borderBottom: "1px solid #ddd" }}>
      <TableCell align="center">{petName}</TableCell>
      <TableCell align="center">${maxDonationAmount}</TableCell>
      <TableCell align="center">progressbar</TableCell>
      <TableCell align="center">
        <Link to={`/dashboard/my-donation-campaign/${_id}`}>
          <FaEdit className="text-[#F69585] text-xl mx-auto"></FaEdit>
        </Link>
      </TableCell>
      <TableCell align="center">
        <Button className="bg-[#F69585]">Donator </Button>
      </TableCell>
      <TableCell align="center">
        <Button className="bg-[#F69585]">Pause </Button>
      </TableCell>
    </TableRow>
  );
};

export default MyDonationCampaignTable;
