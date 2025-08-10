import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContest";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const MyProfile = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-base-100">
        <div>
          <p className="text-lg text-base-content mb-4">
            You are not logged in.
          </p>
          <Link to="/login" className="btn bg-primary text-white">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      <div className="max-w-lg mx-auto bg-white border border-secondary rounded-lg shadow-lg p-6 text-center">
        {/* Profile Image */}
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-primary mb-4"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold text-primary">
          {user.displayName || "Anonymous"}
        </h2>

        {/* Email */}
        <p className=" mt-1">{user.email}</p>

        {/* Buttons */}
        <div className="mt-6 space-x-3">
          <button
            onClick={handleLogout}
            className="btn bg-secondary text-base-content hover:bg-accent"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
