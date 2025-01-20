import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

const RecommendDonation = () => {
  const axiosPublic = useAxiosPublic();

  const { data: donations = [] } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/donations-recommend");
      return data;
    },
  });
  //   sort data in descending order
  const sortData = [...donations].sort(
    (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
  );
  return (
    <>
      <Helmet>
        <title>Recommend Campaign - PetCare</title>
      </Helmet>
      <div className="pb-16 dark:bg-[#272B35] min-h-[95vh]">
        <div className="bg-gray-100 py-20 mb-10 dark:bg-[#181A20]">
          <h1 className="text-center text-[#E16F52] dark:text-white text-2xl md:text-5xl">
            Recommended Donation Campaign!
          </h1>
        </div>
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {sortData.map((item) => (
              <Card
                className="dark:bg-[#181A20] dark:text-white"
                key={item._id}
              >
                <CardMedia sx={{ height: 250 }} image={item.petImage} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.petName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <div className="dark:text-gray-400">
                      <span>
                        <b>Maximum Donation:</b>
                      </span>
                      ${item.maxDonationAmount}
                    </div>
                    <div className="dark:text-gray-400">
                      <span>
                        <b>Donated Amount:</b>
                      </span>
                      ${item.donatedAmount}
                    </div>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/donation-campaign/${item._id}`}>
                    <Button size="small" className="text-[#E16F52] flex gap-1 items-center bg-transparent dark:text-gray-400 p-2 shadow-none">
                      View Details <FaArrowRight></FaArrowRight>
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendDonation;
