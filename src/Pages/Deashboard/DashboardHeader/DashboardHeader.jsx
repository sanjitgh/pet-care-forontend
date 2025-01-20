import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <header className="mb-10 hidden md:block text-[#E16F52] dark:text-white">
      <ul className="flex items-center gap-8">
        <li>
          <Link to={"/"}>Back Home</Link>
        </li>
        <li>
          <Link to={"/pet-listing"}>Pet Listing</Link>
        </li>
        <li>
          <Link to={"/donation-campaign"}>Donation Campaign</Link>
        </li>
      </ul>
    </header>
  );
};

export default DashboardHeader;
