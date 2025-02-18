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
import { SiGrafana } from "react-icons/si";

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
      <section className="dark:bg-[#030712] py-14 md:py-20">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {donations.map((item) => (
              <Card key={item._id} className="dark:bg-[#0D1323] !shadow">
                <CardMedia sx={{ height: 250 }} image={item.petImage} />
                <CardContent>
                  <Typography
                    className="dark:text-white"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {item.petName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <div className="dark:text-gray-400">
                      <span>
                        <b>Maximum Donation: </b>
                      </span>
                      ${item.maxDonationAmount}
                    </div>
                    <div className="dark:text-gray-400">
                      <span>
                        <b>Donated Amount: </b>
                      </span>
                      ${item.donatedAmount}
                    </div>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/donation-campaign/${item._id}`}>
                    <Button
                      className="dark:text-gray-400 !text-[#5F56C6]"
                      size="small"
                    >
                      View Details <FaArrowRight />
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </div>
          <div ref={ref} className="mt-4 text-center">
            {isFetchingNextPage && (
              <div className="flex justify-center mt-10">
                <SiGrafana className="text-4xl text-[#5F56C6] animate-spin" />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DonationCampaign;
