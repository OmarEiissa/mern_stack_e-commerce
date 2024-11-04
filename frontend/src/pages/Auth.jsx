import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Auth = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token,navigate])
  

  return (
    <form
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      onSubmit={onSubmitHandler}
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== "Login" && (
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full px-3 py-2 border border-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        required
        className="w-full px-3 py-2 border border-gray-800"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="w-full px-3 py-2 border border-gray-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* {currentState === "Sign Up" && (
        <input
          type="password"
          placeholder="Confirmation Password"
          required
          className="w-full px-3 py-2 border border-gray-800"
        />
      )} */}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Sign Up" ? (
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              className="text-gray-900 cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              className="text-gray-900 cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}
        <p className="cursor-pointer text-gray-600">Forgot Password?</p>

      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4 w-full active:scale-95 transition-transform duration-300">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Auth;
