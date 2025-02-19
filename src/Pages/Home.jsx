import { Helmet } from "react-helmet-async";
import Banner from "../components/HomeComponents/Banner";
import About from "../components/HomeComponents/About";
import Donner from "../components/HomeComponents/Donner";
import FunFact from "../components/HomeComponents/FunFact";
import CallToAction from "../components/CallToAction/CallToAction";
import PetCategory from "../components/PetCategory/PetCategory";
import FeaturedPet from "../components/FeaturedPet/FeaturedPet";
import OurApp from "../components/OurApp/OurApp";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Petcare</title>
      </Helmet>
      <Banner></Banner>
      <PetCategory></PetCategory>
      <CallToAction></CallToAction>
      <FeaturedPet></FeaturedPet>
      <About></About>
      <Donner></Donner>
      <FunFact></FunFact>
      <OurApp></OurApp>
    </>
  );
};

export default Home;
