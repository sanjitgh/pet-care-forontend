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

  const { data: donationsRecommend = [] } = useQuery({
    queryKey: ["donationsRecommend"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/donations-recommend");
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Recommend Campaign - PetCare</title>
      </Helmet>
      <div className="pb-16 dark:bg-[#030712] min-h-[95vh]">
        <div className="bg-gray-100 py-20 mb-10 dark:bg-[#0D1323]">
          <h1 className="text-center text-[#5F56C6] dark:text-white text-2xl md:text-5xl">
            Recommended Donation Campaign!
          </h1>
        </div>
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {donationsRecommend.map((item) => (
              <Card
                className="dark:bg-[#0D1323] dark:text-white"
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
                    <Button
                      className="dark:text-gray-400 !text-[#5F56C6] flex items-center gap-2 rounded bg-transparent shadow-none"
                      size="sm"
                    >
                      View Details <FaArrowRight />
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
