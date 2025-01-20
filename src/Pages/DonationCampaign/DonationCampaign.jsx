import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const DonationCampaign = () => {
  const axiosPublic = useAxiosPublic();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["donations"],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axiosPublic.get(
          `/donations?page=${pageParam}&limit=6`
        );
        return data;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    });

  const donations = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <Helmet>
        <title>Donation Campaign - PetCare</title>
      </Helmet>
      <div>
        <div className="bg-gray-100 py-20 dark:bg-[#17191E]">
          <h1 className="text-center dark:text-white text-[#E16F52] text-2xl md:text-5xl">
            Donation Campaign!
          </h1>
        </div>
        <div className="dark:bg-[#252932] py-16">
          <div className="container mx-auto px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {donations.map((item) => (
                <Card key={item._id} className="dark:bg-[#17191E]">
                  <CardMedia sx={{ height: 250 }} image={item.petImage} />
                  <CardContent>
                    <Typography className="dark:text-white" gutterBottom variant="h5" component="div">
                      {item.petName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      
                    >
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
                      <Button className="dark:text-gray-400" size="small" sx={{ color: "#E16F52" }}>
                        View Details <FaArrowRight />
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              ))}
            </div>
            <div ref={ref} className="mt-4 text-center">
              {isFetchingNextPage && <p className="dark:text-white">Loading more...</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationCampaign;
