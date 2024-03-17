import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import useCart from "../hook/useCart";

const Card = ({ item }) => {
  const url = "http://localhost:5000";
  const { _id, name, image, price, description } = item;
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  // const navigate = useNavigate();
  // const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        productId: item._id,
        name: item.name,
        email: user.email,
        price: item.price,
        image: item.image,
        quantity: 1,
      };
      try {
        axios.post(`${url}/cartItem`, cartItem).then((response) => {
          if (response.status === 200 || response.status === 201) {
            refetch();
            Swal.fire({
              title: "Product added!",
              position: "center",
              icon: "success",
              showconfirmButtonText: false,
              timer: 1500,
            });
          }
        });
      } catch (error) {
        Swal.fire({
          title: "Some error happen!",
          position: "center",
          icon: "error",
          showconfirmButtonText: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: "Please Login!!",
        position: "center",
        icon: "warning",
        confirmButtonColor: blue,
        cencleButtonColor: blue,
        showconfirmButtonText: true,
        confirmButtonText: `Login Now`,
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating heart gap-1 absolute right-2 top-2 p-4 heartStar bg-red ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      </div>
      <Link>
        <figure>
          <img
            src={image}
            alt=""
            className="hover:scale-95 transition-all rounded-lg duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link>
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">
              {price} <span className="text-sm text-red"> ฿</span>{" "}
            </h5>
            <button
              className="btn bg-red text-white "
              onClick={() => handleAddToCart(item)}
            >
              Add To Cart
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
