import React, { use, useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContest";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Logged in Successfully!",
          icon: "success",
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err);
        toast.error("Google sign-in failed.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Logged in Successfully!",
          icon: "success",
        });
        navigate(location.state ? location.state : "/");
      })
      .catch(() => {
        setError("Wrong email or password.");
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const handleForgotPasswordClick = () => {
    const email = emailRef.current?.value || "";
    navigate("/auth/forgot-password", { state: { email } });
  };

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="card bg-base-100 w-full max-w-sm shadow-xl mx-auto  rounded-2xl border border-gray-100"
      >
        <Helmet>
          <title>Login | WhereIsIt</title>
        </Helmet>
        <ToastContainer/>
        <div className="card-body ">
          <h2 className="text-2xl font-bold text-center text-primary">
            Sign In to WhereIsIt
          </h2>

          <form onSubmit={handleSubmit} className="mt-4">
            {/* Email */}
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="grow"
                ref={emailRef}
              />
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                <path d="M6 11V7a6 6 0 1 1 12 0v4"></path>
                <rect x="6" y="11" width="12" height="10" rx="2"></rect>
              </svg>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="grow"
              />
            </label>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn bg-primary hover:bg-blue-800 text-white mt-4 w-full"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-gray-400 text-sm">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-[#FEE502] text-black border border-gray-200 w-full"
            type="button"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            <span className="ml-2">Login with Google</span>
          </button>

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={location.state}
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
