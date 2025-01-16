import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import PetListing from "../Pages/PetListing/PetListing";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";
import MainLayout from "../MainLayout/MainLayout";
import Dashboard from "../Pages/Deashboard/Dashboard/Dashboard";
import AddPet from "../Pages/Deashboard/AddPet/AddPet";
import DashboardHome from "../Pages/Deashboard/DashboardHome.jsx/DashboardHome";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import MyAddedPet from "../Pages/Deashboard/MyAddedPet/MyAddedPet";
import PetDetails from "../Pages/PetDetails/PetDetails";
import CreateDonation from "../Pages/Deashboard/CreateDonation/CreateDonation";
import MyDonationCampaign from "../Pages/Deashboard/MyDonationCampaign/MyDonationCampaign";
import DonationDetailsCard from "../Pages/DonationDetailsCard/DonationDetailsCard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/pet-listing",
        element: <PetListing></PetListing>,
      },
      {
        path: "/pet-listing/:id",
        element: (
          <PrivetRoute>
            <PetDetails></PetDetails>
          </PrivetRoute>
        ),
      },
      {
        path: "/donation-campaign",
        element: <DonationCampaign></DonationCampaign>,
      },
      {
        path: "/donation-campaign/:id",
        element: <DonationDetailsCard></DonationDetailsCard>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      },
    ],
  },
  // dashboard routes
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: (
      <PrivetRoute>
        <Dashboard></Dashboard>
      </PrivetRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivetRoute>
            <DashboardHome></DashboardHome>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/add-pet",
        element: (
          <PrivetRoute>
            <AddPet></AddPet>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/my-added-pet",
        element: (
          <PrivetRoute>
            <MyAddedPet></MyAddedPet>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/create-donation",
        element: (
          <PrivetRoute>
            <CreateDonation></CreateDonation>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/my-donation-campaign",
        element: (
          <PrivetRoute>
            <MyDonationCampaign></MyDonationCampaign>
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
