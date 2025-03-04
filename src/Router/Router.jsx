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
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import MyDonationUpdate from "../components/MyDonationUpdate/MyDonationUpdate";
import AdoptionRequest from "../Pages/Deashboard/AdoptionRequest/AdoptionRequest";
import DashboardUser from "../Pages/Deashboard/DashboardUsers/DashboardUser";
import AdminRoute from "../Pages/AdminRoute/AdminRoute";
import AllPets from "../Pages/Deashboard/AllPets/AllPets";
import AllDonations from "../Pages/Deashboard/AllDonations/AllDonations";
import DonationUpdate from "../Pages/Deashboard/DonationUpdate/DonationUpdate";
import MyDonation from "../Pages/Deashboard/MyDonation/MyDonation";
import RecommendDonation from "../Pages/RecommendDonation/RecommendDonation";
import MyAddedPetUpdate from "../Pages/Deashboard/MyAddedPetUpdate/MyAddedPetUpdate";
import AboutUs from "../Pages/AboutUs/AboutUs";
import UserProfile from "../Pages/Deashboard/UserProfile/UserProfile";

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
        path: "/recommend",
        element: <RecommendDonation></RecommendDonation>,
      },
      {
        path: "/pet-listing/:id",
        element: <PetDetails></PetDetails>,
      },
      {
        path: "/donation-campaign",
        element: <DonationCampaign></DonationCampaign>,
      },
      {
        path: "/donation-campaign/:id",
        element: <DonationDetails></DonationDetails>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
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
        path: "/dashboard/profile",
        element: (
          <PrivetRoute>
            <UserProfile></UserProfile>
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
        path: "/dashboard/my-added-pet/:id",
        element: (
          <PrivetRoute>
            <MyAddedPetUpdate></MyAddedPetUpdate>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/adoption-request",
        element: (
          <PrivetRoute>
            <AdoptionRequest></AdoptionRequest>
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
      {
        path: "/dashboard/my-donations",
        element: (
          <PrivetRoute>
            <MyDonation></MyDonation>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/my-donation-campaign/:id",
        element: (
          <PrivetRoute>
            <MyDonationUpdate></MyDonationUpdate>
          </PrivetRoute>
        ),
      },
      // admin routes
      {
        path: "/dashboard/users",
        element: (
          <PrivetRoute>
            <AdminRoute>
              <DashboardUser></DashboardUser>
            </AdminRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/all-pets",
        element: (
          <PrivetRoute>
            <AdminRoute>
              <AllPets></AllPets>
            </AdminRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/all-donations",
        element: (
          <PrivetRoute>
            <AdminRoute>
              <AllDonations></AllDonations>
            </AdminRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/all-donations/:id",
        element: (
          <PrivetRoute>
            <AdminRoute>
              <DonationUpdate></DonationUpdate>
            </AdminRoute>
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
