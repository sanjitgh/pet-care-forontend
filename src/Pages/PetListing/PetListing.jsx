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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();

  // get data fatchingd
  const { data: pets = [] } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/pets");
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
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
