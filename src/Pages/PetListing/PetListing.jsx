import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hook/useAxiosPublic";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SiGrafana } from "react-icons/si";
import SkeletonGrid from "../../Skeleton/SkeletonGrid";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get("filter") || "";

  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setFilter(queryParams.get("filter") || "");
  }, [location.search]);

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pets", filter, search],
      queryFn: async ({ pageParam = 1 }) => {
        setLoading(true);
        const { data } = await axiosPublic.get(
          `/pets?adopted=false&filter=${filter}&search=${search}&page=${pageParam}&limit=6`
        );
        setLoading(false);
        return data;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }
        return undefined; // No more pages
      },
    });
  const pets = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <Helmet>
        <title>All Pet - PetCare</title>
      </Helmet>
      <section className="py-14 md:pt-10 md:pb-20 dark:bg-[#030712] min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-2">
          {/* Control Bar */}
          <div className="mb-10 md:flex items-center gap-5 justify-start">
            <FormControl className="md:w-48 w-full !text-[#5F56C6]">
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: "#5F56C6",
                  "&.Mui-focused": {
                    color: "#5F56C6",
                  },
                }}
              >
                Category
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    borderBottom: "2px solid #5F56C6",
                    borderRadius: "0px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderBottom: "2px solid #5F56C6",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderBottom: "2px solid #5F56C6",
                  },
                }}
              >
                <MenuItem value={"bird"}>Bird</MenuItem>
                <MenuItem value={"cat"}>Cat</MenuItem>
                <MenuItem value={"dog"}>Dog</MenuItem>
              </Select>
            </FormControl>

            <TextField
              onChange={(e) => setSearch(e.target.value)}
              id="standard-basic"
              className="md:w-48 w-full"
              label="Search"
              variant="standard"
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "2px solid #5F56C6",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid #5F56C6",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "2px solid #5F56C6",
                },
                "& .MuiInputLabel-root": {
                  color: "#5F56C6",
                  marginLeft: "15px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#5F56C6",
                },
              }}
            />
          </div>

          {/* Main Content */}
          {loading ? (
            <SkeletonGrid></SkeletonGrid>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {pets.map((item) => (
                <Card key={item._id} className="dark:bg-[#0D1323] !shadow">
                  <CardMedia
                    className="!rounded"
                    sx={{ minHeight: 250 }}
                    image={item.image}
                  />
                  <CardContent className="!pb-0">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="dark:text-white text-[#5F56C6]"
                    >
                      {item.name.slice(0, 40)}
                    </Typography>
                    <Typography
                      className="dark:text-gray-400"
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      <span className="font-semibold">Age: </span>
                      {item.age} Years
                    </Typography>
                    <Typography
                      className="dark:text-gray-400"
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      <span className="font-semibold"></span>
                      {item.location}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/pet-listing/${item._id}`}>
                      <Button
                        className="dark:text-gray-400 !text-[#5F56C6] rounded"
                        size="small"
                      >
                        View Details <FaArrowRight />
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              ))}
            </div>
          )}

          {/* infininty loading */}
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

export default PetListing;
