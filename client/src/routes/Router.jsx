import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import SignUp from "../components/signUp";
import SignIn from "../components/signIn";
import ProductList from "../pages/shop/ProductList";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/shop",
        element: (
          <PrivateRouter>
            <ProductList />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
