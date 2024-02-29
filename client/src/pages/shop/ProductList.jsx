import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Catagories from "../home/Categories";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtedItems, setFiltedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
        setFiltedItems(data);
        setCategories(["all", ...new Set(data.map((item) => item.category))]);
        {
          /* ... ใช้เพื่อสลายโครงสร้างของ opject */
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    // setFiltedItems(filtered);
    handleSortChange(sortOption, filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (option, products) => {
    setSortOption(option);
    let sortedItems = [...products];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((b, a) => a.name.localeCompare(b.name));
        break;
      case "Low-to-High":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "High-to-Low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }
    setFiltedItems(sortedItems);
    setCurrentPage(1);
  };

  const indexOfLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtedItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Product List Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col justify-center items-center">
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-snug">
              Unleash Your Inner <span className="text-red"> Geek</span>: <br />{" "}
              Shop Our Exclusive Tech-themed Merchandises
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              In general, Software Engineering is a discipline that focuses on
              developing high-quality and efficient software using appropriate
              methods and processes to produce results that meet the needs of
              customers or users. Therefore, discussions about Software
              Engineering may emphasize principles, guidelines, and technologies
              used in software development. Additionally, attention is given to
              work processes and team management in software projects.
            </p>
            <button className="btn bg-red px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* Product List Card */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* Filter */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            {categories.map((category, index) => {
              return (
                <button
                  key={index}
                  onClick={() => filterItems(category)}
                  className={`
                        ${
                          selectedCategory === category ? "active" : ""
                        } py-4 py-2 rounded-full`}
                >
                  <p className="capitalize">{category}</p>
                </button>
              );
            })}
          </div>
          {/* Sort Option */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <select
                id="sort"
                className="bg-black text-white px-2 rounded-sm"
                onChange={(e) => handleSortChange(e.target.value, filtedItems)}
                value={sortOption}
              >
                <option value={"default"}>Default</option>
                <option value={"A-Z"}>A-Z</option>
                <option value={"Z-A"}>Z-A</option>
                <option value={"Low-to-High"}>Low to High</option>
                <option value={"High-to-Low"}>High to Low</option>
              </select>
            </div>
          </div>
          {/* Product Card */}
          <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
            {currentItems.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center my-8 flex-wrap gap-2">
          {Array.from({
            length: Math.ceil(filtedItems.length / itemsPerPage),
          }).map((_, index) => {
            return (
              <button
                key={index}
                className={`my-1 px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-red text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  paginate(index + 1);
                }}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
