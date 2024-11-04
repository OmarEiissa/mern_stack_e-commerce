import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] h-[calc(100vh-53px)] border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to={"/add"}
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l max-md:justify-center`}
        >
          <img src={assets.add_icon} alt="Add Icon" className="size-5" />
          <p className="hidden md:block">Add Item</p>
        </NavLink>

        <NavLink
          to={"/list"}
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l max-md:justify-center`}
        >
          <img src={assets.order_icon} alt="Order Icon" className="size-5" />
          <p className="hidden md:block">List Item</p>
        </NavLink>

        <NavLink
          to={"/orders"}
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l max-md:justify-center`}
        >
          <img src={assets.order_icon} alt="Order Icon" className="size-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
