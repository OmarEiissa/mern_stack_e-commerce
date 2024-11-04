import { NavLink } from "react-router-dom";
import Title from "../components/Title";

const Home = () => {
  return (
    <div className="text-2xl md:text-4xl">
      <div className="text-3xl md:text-6xl mb-16">
        <Title text1="ADMIN" text2="PANEL" />
      </div>

      <p className="px-4 font-bold mb-2">Welcome Back 👋</p>

      <div className="px-4">
        Go now to{" "}
        <NavLink to="/add" className="text-blue-500 hover:text-blue-700">
          Add
        </NavLink>{" "}
        more products or{" "}
        <NavLink to="/orders" className="text-blue-500 hover:text-blue-700">
          View
        </NavLink>{" "}
        new orders.
      </div>
    </div>
  );
};

export default Home;
