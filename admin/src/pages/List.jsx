import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import PropTypes from "prop-types";
import Title from "../components/Title";
import { RotateLoader } from "react-spinners";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="text-3xl md:text-6xl">
        <Title text1="ALL" text2="Products" />
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-145px)]">
        {/* -------- List Table Title -------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm sticky top-0">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* -------- Product List -------- */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <RotateLoader color="#aaa" size={20} />
          </div>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img
                src={item.image[0] || assets.logo}
                alt={item.name}
                className="w-12"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p
                className="text-right md:text-center cursor-pointer text-lg"
                onClick={() => removeProduct(item._id)}
              >
                <img
                  src={assets.cross_icon}
                  alt="Cross Icon"
                  className="inline w-3 cursor-pointer"
                />
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;
