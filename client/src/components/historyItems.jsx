import React, { useContext, useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { FiPlus, FiMinus } from "react-icons/fi";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useCart from "../hook/useCart";

const historyItems = ({ name, reload, totalQuantity, setTotalQuantity }) => {
  const { user, setReload } = useContext(AuthContext);
  const [dataCart, setDataCart] = useState([]);
  const [productData, setProductData] = useState([]);
  const [nodata, setNodata] = useState(false);
  const [randomOneCary, setRandomOneCart] = useState([]);
  const [totalCash, setTotalCash] = useState([]);
  const url = "http://localhost:5000";
  const [cart, refetch] = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`${url}/cartItem/${user.email}`);
          const data = await response.data;
          setDataCart(data);
          const productDataPromises = data.map(async (cartItem) => {
            const productResponse = await axios.get(
              `${url}/products/${cartItem.productId}`
            );
            return productResponse.data;
          });
          const productDataResults = await Promise.all(productDataPromises);
          setProductData(productDataResults);
          const randomOne = data[0];
          setRandomOneCart(randomOne);
          const totalCashInCart = data.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          setTotalCash(totalCashInCart);
        } else {
          console.log("User or email is null:", user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user, reload, totalCash]);

  const closeModal = () => {
    const modal = document.getElementById(name);
    modal.close();
  };

  const handleIncreaseQuantity = async (cartItem) => {
    const newCartItem = {
      productId: cartItem.productId,
      name: cartItem.name,
      email: user.email,
      price: cartItem.price,
      image: cartItem.image,
      quantity: 1,
    };
    try {
      await axios.post(`${url}/cartItem`, newCartItem);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecreaseQuantity = async (cartItem) => {
    const decreaseQuantity = cartItem.quantity - 1;
    const newCartItem = {
      productId: cartItem.productId,
      email: cartItem.email,
      price: cartItem.price,
      name: cartItem.name,
      image: cartItem.image,
      quantity: decreaseQuantity,
    };
    try {
      if (decreaseQuantity !== 0) {
        await axios.put(`${url}/cartItem/${cartItem._id}`, newCartItem);
        setReload(true);
      } else {
        console.log("Cannot decrease quantity");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (cartItem) => {
    try {
      await axios.delete(`${url}/cartItem/${cartItem._id}`);
      const newTotalQuantity = totalQuantity - cartItem.quantity;
      setTotalQuantity(newTotalQuantity);
      setReload(true);
      refetch()
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearAll = async (user) => {
    try {
      await axios.delete(`${url}/cartItem/clear/${user.email}`);
      setTotalQuantity(0);
      setReload(true);
      refetch()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dialog id={name} className="modal">
      <div className="modal-box flex flex-col">
        <button className="close-button self-end mr-4" onClick={closeModal}>
          <AiOutlineClose />
        </button>
        {/* เนื้อหา Modal */}
        {nodata ? (
          <div className="items-center justify-center ml-auto mr-auto mt-[100px] mb-[100px]">
            <h1>No product in carts</h1>
          </div>
        ) : (
          <>
            {dataCart.map((cartItem, index) => (
              <div key={index} className="modal-content flex p-4 items-center">
                {/* รูปสินค้า */}
                <img
                  src={cartItem.image}
                  alt="Product"
                  className="w-12 h-12 mr-4"
                />

                {/* ชื่อสินค้า */}
                <div>
                  <p className="text-sm font-semibold">
                    {productData[index]?.name}
                  </p>
                  <p className="text-gray-500">
                    {productData[index]?.description}
                  </p>
                </div>

                {/* จำนวนสินค้า */}
                <div className="flex items-center ml-auto">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecreaseQuantity(cartItem)}
                  >
                    <FiMinus />
                  </button>
                  <span className="mx-2">{cartItem.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncreaseQuantity(cartItem)}
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* ถังขยะ */}
                <button
                  className="delete-button ml-[30px]"
                  onClick={() => handleDelete(cartItem)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
            {/* ข้อมูลรายละเอียดเพิ่มเติม */}
            <div className="flex p-4 items-center">
              <p className="ml-auto">{cart.length || 0} รายการ</p>
            </div>
            <div className="flex p-4 items-center">
              <p>Email : {randomOneCary.email}</p>
              <p className="ml-auto">รวม {totalCash} บาท</p>
            </div>

            {/* ปุ่ม Clear All และ Buy Now */}
            <div className="flex">
              <button
                className="bg-red text-white px-4 py-2 rounded ml-auto"
                onClick={() => handleClearAll(user)}
              >
                Clear All
              </button>
              <button className="bg-blue text-white px-4 py-2 rounded ml-[10px]">
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default historyItems;
