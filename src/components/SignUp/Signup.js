import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import "./Signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../firebase/Firebase.config";
import { AuthContext } from "../../Context/Context";

const Signup = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [spinn, setSpinn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleForm = (event) => {
    //alert("hi");
    setSpinn(true);
    event.preventDefault();

    setSuccess(false);

    const form = event.target;

    const nam = form.nam.value;
    const name = form.email.value;
    const pass = form.password.value;
    const url = form.url.value;
    //console.log(name, pass, nam, url);

    if (pass.length < 6) {
      setError("Password should be 6 characters or more.");
      return;
    }

    createUser(name, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
        setSuccess(true);
        form.reset();
        setError("");
        navigate(from, { replace: true });
        handleUpdateUserProfile(nam, url);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };

  const handleUpdateUserProfile = (nam, url) => {
    const profile = {
      displayName: nam,
      photoURL: url,
    };
    console.log(profile);
    updateUserProfile(profile)
      .then(() => setSpinn(false))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {spinn ? (
        <div className="w-96 my-20 mx-auto">
          <Loader></Loader>
        </div>
      ) : (
        <div className="form">
          <h1 className="text-4xl m-10 text-white underline">Sign Up Form</h1>
          {/* onSubmit={handleForm} */}
          <form onSubmit={handleForm}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-left block mb-2 text-sm font-medium text-white dark:text-gray-300"
              >
                Your Full Name
              </label>
              <input
                type="text"
                id="name"
                name="nam"
                className="bg-black border w-80 border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Full Name"
                required
              ></input>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-left block mb-2 text-sm font-medium text-white dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-black border w-80 border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@......com"
                required
              ></input>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-left block mb-2 text-sm font-medium text-white dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="  bg-black border w-80 border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              ></input>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-left block mb-2 text-sm font-medium text-white dark:text-gray-300"
              >
                Image Url
              </label>
              <input
                type="text"
                id="name"
                name="url"
                className="bg-black border w-80 border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Image Url"
                required
              ></input>
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                ></input>
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-white dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <p className="text-red-800 font-semibold">{error}</p>
            {success && (
              <p className="text-red-800">User Created Successfully</p>
            )}
            <p>{error}</p>
            <p className=" text-white mb-5">
              <small className="mr-5">Already Have an account?</small>
              <Link to="/login"> Log In</Link>
            </p>
            <button
              type="submit"
              className=" mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
