import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { BounceLoader } from "react-spinners";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API Calls for COD
        case "cod":
          {
            const response = await axios.post(
              `${backendUrl}/api/order/place`,
              orderData,
              { headers: { token } }
            );

            if (response.data.success) {
              setCartItems({});
              navigate("/orders");
              toast.success("Order placed successfully");
            } else {
              toast.error(response.data.message);
            }
          }
          break;

        case "stripe":
          {
            const responseStripe = await axios.post(
              `${backendUrl}/api/order/stripe`,
              orderData,
              { headers: { token } }
            );

            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      onSubmit={onSubmitHandler}
    >
      {/* -------- Left Side -------- */}
      <div className="flex flex-col gap-4 w-full md:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
        />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
          />
        </div>

        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
        />
      </div>
      {/* -------- Right Side -------- */}
      <div className="mt-8 min-w-[40%]">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ---------------- Payment Method Selection ---------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              className="flex items-center gap-3 border p-2 cursor-pointer flex-1"
              onClick={() => setMethod("stripe")}
            >
              <p
                className={`min-w-3 h-3 border-2 border-white outline outline-1 outline-gray-400 rounded-full transition-all duration-200 ${
                  method === "stripe" ? "bg-gray-600" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="Stripe Logo"
                className="h-5 mx-4"
              />
            </div>

            {/* <div
              className="flex items-center gap-3 border p-2 cursor-pointer flex-1"
              onClick={() => setMethod("razorpay")}
            >
              <p
                className={`min-w-3 h-3 border-2 border-white outline outline-1 outline-gray-400 rounded-full transition-all duration-200 ${
                  method === "razorpay" ? "bg-gray-600" : ""
                }`}
              />
              <img
                src={assets.razorpay_logo}
                alt="Razorpay Logo"
                className="h-5 mx-4"
              />
            </div> */}

            <div
              className="flex items-center gap-3 border p-2 cursor-pointer flex-1"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3 h-3 border-2 border-white outline outline-1 outline-gray-400 rounded-full transition-all duration-200 ${
                  method === "cod" ? "bg-gray-600" : ""
                }`}
              />
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
          <button
        className={`w-full py-2 px-8 mt-4 bg-black text-white font-light active:scale-95 transition flex justify-center items-center ${
          loading && "bg-gray-700 cursor-no-drop"
        }`}
      >
        {!loading ? (
          "PLACE ORDER"
        ) : (
          <BounceLoader color="#fff" loading={loading} size={25} />
        )}
      </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
