import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Petcare</title>
      </Helmet>
      <Banner></Banner>
      <Footer></Footer>
    </>
  );
};

export default Home;
