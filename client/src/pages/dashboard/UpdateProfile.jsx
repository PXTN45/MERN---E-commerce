import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);

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
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile({ name, photoURL })
      .then((result) => {
        alert("Update Your Profile successful");
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
        <h3 className="font-bold text-lg">Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="name"
            placeholder="Your name"
            className="input input-bordered"
            required
            {...register("name")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Profile Photo</span>
          </label>
          <input
            type="photoURL"
            placeholder="Photo URL"
            className="input input-bordered"
            required
            {...register("photoURL")}
          />
        </div>
        <div className="form-control mt-6">
          <input
            type="submit"
            value="Update"
            className="btn bg-red text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
