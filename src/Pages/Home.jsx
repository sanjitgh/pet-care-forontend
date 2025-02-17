import { Helmet } from "react-helmet-async";
import Banner from "../components/HomeComponents/Banner";
import About from "../components/HomeComponents/About";
import Donner from "../components/HomeComponents/Donner";
import FunFact from "../components/HomeComponents/FunFact";
import CallToAction from "../components/CallToAction/CallToAction";
import PetCategory from "../components/PetCategory/PetCategory";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Petcare</title>
      </Helmet>
      <Banner></Banner>
      <PetCategory></PetCategory>
      <CallToAction></CallToAction>
      <About></About>
      <FunFact></FunFact>
      <Donner></Donner>
    </>
  );
};

export default Home;
