import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import PropTypes from "prop-types";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center w-full">
      <div className="inline-flex gap-2 items-center mb-3">
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-400" />
        <p className="text-sm sm:text-lg text-gray-500">
          <a
            href="https://my-portfolio-chi-three-25.vercel.app/"
            className="font-bold text-blue-500 hover:text-blue-700 transition-colors"
          >
            Contact me{" "}
          </a>
          for
          <span className="font-semibold"> EMAIL</span> and
          <span className="font-semibold"> PASSWORD</span>
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-400" />
      </div>

      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`mt-2 w-full py-2 px-4 rounded-md text-white bg-black active:scale-95 transition flex justify-center items-center ${
              loading && "bg-gray-700 cursor-no-drop"
            }`}
            disabled={loading}
          >
            {!loading ? (
              "Login"
            ) : (
              <BounceLoader color="#fff" loading={loading} size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
