import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useCart from "../../hook/useCart";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItem, setCartItem] = useState([]);
  return (
    <div className="max-w-sceen-2xl container mx-auto xl:px-24 px-4">
      <div className="flex justify-center mt-20">
        <h1>Item Added To The Cart</h1>
      </div>

      {cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>#</th>
                <th>Product</th>
                <th>Item name</th>
                <th>Quantity</th>
                <th>Price Per Unit</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                <tr key={index}>
                  <td> {item.length + 1}</td>
                  <td>
                    {" "}
                    <div className="avatar">
                      <div className="w-24 rounded">
                        <img src={item.image} />
                      </div>
                    </div>
                  </td>
                  <td className="flex justify-center">
                    <button className="btn btn-xs"> - </button>
                     {item.quantity}</td>
                    <button className="btn btn-xs"> + </button>
                  <td> {item.quantity}</td>
                  <td> {item.price}</td>
                  <td> {item.price}</td>

                </tr>;
              })}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="text-center my-20">
          <p>cart is empty.</p>
          {/* <Link to={/}> Back To Shop </Link> */}
        </div>
      )}
    </div>
  );
};

export default Cart;
