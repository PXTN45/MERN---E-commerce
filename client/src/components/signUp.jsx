import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const signUp = () => {
  const { createUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Account register successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex-items-center justify-center my-20">
      <form
        className="card-body flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-bold text-lg">Create An Account</h3>
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
          {/* <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label> */}
        </div>
        <div className="form-control mt-6">
          <input
            type="submit"
            value="register"
            className="btn bg-red text-white"
          />
        </div>
        <p className="text-center my-2 ">
          Have an account ?{" "}
          <button
            onClick={() => document.getElementById("register").showModal()}
            to="/signin"
            className="underline ml-1"
          >
            {" "}
            Login{" "}
          </button>{" "}
        </p>
      </form>
      <div className="text-center space-x-5 mb-10">
        <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
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
  );
};

export default signUp;
