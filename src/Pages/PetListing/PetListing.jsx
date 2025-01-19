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

const PetListing = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get("filter") || "";

  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setFilter(queryParams.get("filter") || "");
  }, [location.search]);

  const { ref, inView } = useInView();


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pets", filter, search],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axiosPublic.get(
          `/pets?adopted=false&filter=${filter}&search=${search}&page=${pageParam}&limit=6`
        );
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
      <section className="py-20">
        <div className="container mx-auto px-2 ">
          {/* Control Bar */}
          <div className="mb-10 md:flex items-center gap-5 justify-start">
            <FormControl className="md:w-48 w-full">
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: "#E16F52",
                  "&.Mui-focused": {
                    color: "#E16F52",
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
                    borderBottom: "2px solid #E16F52",
                    borderRadius: "0px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderBottom: "2px solid #E16F52",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderBottom: "2px solid #E16F52",
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
                  borderBottom: "2px solid #E16F52",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid #E16F52",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "2px solid #E16F52",
                },
                "& .MuiInputLabel-root": {
                  color: "#E16F52",
                  marginLeft: "15px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E16F52",
                },
              }}
            />
          </div>
          {/* Main Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {pets.map((item) => (
              <Card key={item._id}>
                <CardMedia sx={{ minHeight: 250 }} image={item.image} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "#E16F52" }}
                  >
                    {item.name.slice(0, 40)}
                  </Typography>
                  <Typography gutterBottom variant="p" component="div">
                    <span className="font-semibold">Age:</span> {item.age}
                  </Typography>
                  <Typography gutterBottom variant="p" component="div">
                    <span className="font-semibold">Location:</span>{" "}
                    {item.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/pet-listing/${item._id}`}>
                    <Button size="small" sx={{ color: "#E16F52" }}>
                      View Details <FaArrowRight />
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </div>
          <div ref={ref} className="mt-4 text-center">
            {isFetchingNextPage && <p>Loading more...</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default PetListing;
