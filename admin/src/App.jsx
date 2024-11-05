import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import Login from "./components/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full0 h-[calc(100vh-53px)]">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-5 text-gray-600 text-base ">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/*" element={<Navigate to="/" replace={true} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
