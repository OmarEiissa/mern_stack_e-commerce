import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { RotateLoader } from "react-spinners";
import PropTypes from "prop-types";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Failed to fetch orders. Please try again later");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      <div className="text-3xl md:text-6xl">
        <Title text1="Orders" text2="Page" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <RotateLoader color="#aaa" size={20} />
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[calc(100vh-145px)]">
          {orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-12"
              />

              <div>
                <div className="border p-1">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p key={index} className="py-0.5">
                          {item.name} <span className="text-gray-400">X</span>{" "}
                          {item.quantity} <span>{item.size}</span> .
                        </p>
                      );
                    } else {
                      return (
                        <p key={index} className="py-0.5">
                          {item.name} <span className="text-gray-400">X</span>{" "}
                          {item.quantity} <span>{item.size}</span> ,
                        </p>
                      );
                    }
                  })}
                </div>

                <p className="mt-3 mb-2 font-medium">{`${order.address.firstName} ${order.address.lastName}`}</p>

                <div>
                  <p>{`${order.address.street},`}</p>
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                </div>

                <p>{order.address.phone}</p>
              </div>

              <div>
                <p className="text-sm sm:text-[15px]">
                  Items: {order.items.length}
                </p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>payment: {order.payment ? "Done" : "Pending"}</p>
                <p>
                  Date:{" "}
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>

              <p className="text-sm sm:text-[15px]">
                {currency}
                {order.amount}
              </p>

              <select
                className="p-2 font-semibold"
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;
