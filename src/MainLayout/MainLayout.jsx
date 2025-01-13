import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet></Outlet>
        <Toaster></Toaster>
      </main>
    </>
  );
};

export default MainLayout;
