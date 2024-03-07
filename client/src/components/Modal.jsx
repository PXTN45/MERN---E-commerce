import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { SiGmail } from "react-icons/si";
import { FaFacebookF,FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const Modal = ({ name }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const { login, signUpWithGoogle } = useContext(AuthContext);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        alert("Login successful");
        document.getElementById(name).close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignUp = () => {
    signUpWithGoogle().then((result) => {
      const user = result.user;
      console.log(user);
      alert("Google Login successful");
      document.getElementById("login").close();
    });
  };

  return (
    <dialog id={name} className="modal">
      <div className="modal-box">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Login!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              {...register("password")}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Login"
              className="btn bg-red text-white"
            />
          </div>
          <p className="text-center my-2 ">
            Don't have an account ?{" "}
            <Link to="/signup" className="underline ml-1">
              {" "}
              Sign Up Now{" "}
            </Link>{" "}
          </p>
          <button
            htmlFor={name}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById(name).close()}
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </form>
        <div className="text-center space-x-10 mb-5 ">
          <button
            className="btn btn-ghost btn-circle hover:bg-red hover:text-white"
            onClick={googleSignUp}
          >
            <SiGmail />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
