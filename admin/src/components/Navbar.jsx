import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-[max(10%,80px)] cursor-pointer"
        />
      </Link>
      <button
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
};

Navbar.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Navbar;
