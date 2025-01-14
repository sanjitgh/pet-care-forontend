import { Helmet } from "react-helmet-async";
import Banner from "../components/HomeComponents/Banner";
import Footer from "../components/Footer";
import About from "../components/HomeComponents/About";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Petcare</title>
      </Helmet>
      <Banner></Banner>
      <About></About>
      <Footer></Footer>
    </>
  );
};

export default Home;
