import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <header className="mb-10 hidden md:block text-[#E16F52]">
      <ul className="flex items-center gap-5">
        <li>
          <Link to={"/"}>Home</Link>
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
