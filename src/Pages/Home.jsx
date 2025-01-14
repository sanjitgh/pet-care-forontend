import { Helmet } from "react-helmet-async";
import Banner from "../components/HomeComponents/Banner";
import Footer from "../components/Footer";
import About from "../components/HomeComponents/About";
import Donner from "../components/HomeComponents/Donner";
import FunFact from "../components/HomeComponents/FunFact";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Petcare</title>
      </Helmet>
      <Banner></Banner>
      <About></About>
      <FunFact></FunFact>
      <Donner></Donner>
      <Footer></Footer>
    </>
  );
};

export default Home;
