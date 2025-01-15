import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hook/useAxiosPublic";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  // get data fatchingd
  const { data: pets = [] } = useQuery({
    queryKey: ["pets", filter, search],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/pets?filter=${filter}&search=${search}`
      );
      return data;
    },
  });

  //   sort data in descending order
  const sortData = [...pets].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <Helmet>
        <title>All Pet - PetCare</title>
      </Helmet>
      <section className="py-20">
        <div className="container mx-auto px-2 ">
          {/* control bar */}
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
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E16F52",
                },
              }}
            />
          </div>
          {/* main content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {sortData.map((item) => (
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
                  <Link to={`pet-listing/${item._id}`}>
                    <Button size="small" sx={{ color: "#E16F52" }}>
                      View Details <FaArrowRight></FaArrowRight>
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PetListing;
