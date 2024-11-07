import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const { getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/auth");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium sm:sticky top-0 w-full bg-white z-30">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-32 md:w-36" />
      </Link>

      <ul className="hidden sm:flex gap-2 md:gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className={"flex flex-col items-center gap-1"}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink
          to={"/collection"}
          className={"flex flex-col items-center gap-1"}
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to={"/orders"} className={"flex flex-col items-center gap-1"}>
          <p>My Orders</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to={"/about"} className={"flex flex-col items-center gap-1"}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to={"/contact"} className={"flex flex-col items-center gap-1"}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6 sm:gap-3 md:gap-6">
        {
          <img
            src={assets.search_icon}
            alt="Search Icon"
            className="w-5 cursor-pointer"
            onClick={() =>
              !location.pathname.includes("collection") &&
              navigate("/collection")
            }
          />
        }

        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="Profile Icon"
            className="w-5 cursor-pointer"
            onClick={() => (token ? null : navigate("/auth"))}
          />
          {/* Dropdown Menu */}
          {token && (
            <div className=" dropdown-menu group-hover:block hidden absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p className="cursor-pointer hover:text-black" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} alt="Cart Icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          src={assets.menu_icon}
          alt="Menu Icon"
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-40 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer w-fit"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
              className="h-4 rotate-180"
            />
            <p className="text-lg font-bold">Back</p>
          </div>
          <NavLink
            to={"/"}
            className={"py-2 pl-6 border"}
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to={"/collection"}
            className={"py-2 pl-6 border"}
            onClick={() => setVisible(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to={"/orders"}
            className={"py-2 pl-6 border"}
            onClick={() => setVisible(false)}
          >
            <p>My Orders</p>
          </NavLink>
          <NavLink
            to={"/about"}
            className={"py-2 pl-6 border"}
            onClick={() => setVisible(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to={"/contact"}
            className={"py-2 pl-6 border"}
            onClick={() => setVisible(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
