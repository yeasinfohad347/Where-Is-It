import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContest";
import Swal from "sweetalert2";

//import { Helmet } from "react-helmet-async";

const Register = () => {
  const [error, setError] = useState("");
  const { creatUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Congratulations! You successfully registered!",
          icon: "success",
        });
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.url.value;

    if (!regex.test(password)) {
      setError(
        "Must have an Uppercase letter in the password\nMust have a Lowercase letter in the password\nLength must be at least 6 characters"
      );
      return;
    } else {
      setError("");
    }

    creatUser(email, password)
      .then(() => {
        updateUser({
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            Swal.fire({
              title: "Congratulations! You successfully registered!",
              icon: "success",
            });
            navigate(location.state || "/");
          })
          .catch((err) => {
            console.error(err.message);
          });
      })
      .catch((err) => {
        console.error(err.message);
        if (err.code === "auth/email-already-in-use") {
          setError("You have already been registered with this email.");
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="card bg-base-100 w-full max-w-sm mx-auto mt-20 shadow-2xl"
    >
      {/* <Helmet>
        <title>Register</title>
      </Helmet> */}
      <div className="card-body">
        <p className="text-2xl font-extrabold mx-auto">Create Account</p>
        <form onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Name"
            required
          />
          <label className="label">Photo URL</label>
          <input
            type="url"
            name="url"
            className="input input-bordered w-full"
            placeholder="Photo URL"
            required
          />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Email"
            required
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="Password"
            required
          />

          {error && (
            <p className="mt-2 text-red-500 whitespace-pre-line">{error}</p>
          )}

          <button className="btn bg-purple-600 text-white w-full mt-4">
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-[#FEE502] text-black mt-2 w-full border border-gray-200"
          type="button"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
          Login with Google
        </button>

        <p className="mt-2 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
