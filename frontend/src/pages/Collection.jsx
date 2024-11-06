import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { RotateLoader } from "react-spinners";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-hight":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "hight-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      case "newest":
        setFilterProducts(
          fpCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        break;
      case "oldest":
        setFilterProducts(
          fpCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        );
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Left Filter Options */}
      <div className="min-w-36 max-w-60 w-full sm:sticky sm:top-20 max-h-[calc(100vh-340px)] z-20">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="Dropdown Icon"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        <div className="relative">
          <div
            className={`absolute bg-white w-full top-0 left-0 ${
              showFilter ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            } sm:max-h-none sm:opacity-100 sm:block transition-all duration-300 ease-in-out`}
          >
            {/* Category Filter */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block`}>
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>

              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2 w-fit cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Men"}
                    onClick={toggleCategory}
                  />{" "}
                  Man
                </label>

                <label className="flex gap-2 w-fit cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Women"}
                    onClick={toggleCategory}
                  />{" "}
                  Women
                </label>

                <label className="flex gap-2 w-fit cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Kids"}
                    onClick={toggleCategory}
                  />{" "}
                  Kids
                </label>
              </div>
            </div>

            {/* SubCategory Filter */}
            <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block`}>
              <p className="mb-3 text-sm font-medium">TYPE</p>

              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2 w-fit cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Topwear"}
                    onClick={toggleSubCategory}
                  />
                  Topwear
                </label>

                <label className="flex gap-2 w-fit cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Bottomwear"}
                    onClick={toggleSubCategory}
                  />
                  Bottomwear
                </label>

                <label className="flex gap-2 w-fit cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Winterwear"}
                    onClick={toggleSubCategory}
                  />
                  Winterwear
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 items-center sm:sticky sm:top-[76px] bg-white z-20">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* Product Sort */}
          <select
            className="border-2 border-gray-300 text-sm px-2 mb-3"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-hight">Sort by: Low to Hight</option>
            <option value="hight-low">Sort by: Hight to Low</option>
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>

        {/* Map Products */}
        {filterProducts <= 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <RotateLoader color="#aaa" size={20} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
