import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import HistoryItems from "./historyItems";
import { AuthContext } from "../context/AuthProvider";
import Profile from "./Profile";
import axios from "axios";

const NavBar = () => {
  const url = "http://localhost:5000";
  const { user, reload, setReload } = useContext(AuthContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    setReload(false);
    
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/cartItem/${user.email}`
        );
        
        const data = await response.data;
          const sumQuantity = data.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
            );
        if (response.status === 200) {
          setTotalQuantity(sumQuantity);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user, reload]);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Category</summary>
          <ul className="p-2">
            <li>
              <a href="/shop">All</a>
            </li>
            <li>
              <a>Clothing</a>
            </li>
            <li>
              <a>Accessories</a>
            </li>
            <li>
              <a>Gadgets</a>
            </li>
            <li>
              <a>Swag</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a>Order online</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Promotion</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 translate-all duration-300 ease-in-out">
      <div className="navbar xl:px-24">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a className="btn btn-ghost text-md text-xl">
              <img
                src="/logo.png"
                alt=""
                className="h6 lg:h-12 pr-1 mx-auto "
              />
              <span className="text-red">TEST</span>SE Souvenir Shop
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle hidden lg:flex mr-3 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hidden lg:flex mr-3 items-center justify-center"
              onClick={() => document.getElementById("carts").showModal()}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {totalQuantity}
                </span>
              </div>
            </div>
            {user ? (
              <>
                <Profile user={user} />
              </>
            ) : (
              <button
                className="btn bg-red rounded-full px-5 text-white flex items-center gap-2"
                onClick={() => document.getElementById("login").showModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 
                    0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 
                    9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Login
              </button>
            )}
          </div>
          <Modal name="login" />
          <HistoryItems
            name="carts"
            reload={reload}
            totalQuantity={totalQuantity}
            setTotalQuantity={setTotalQuantity}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
