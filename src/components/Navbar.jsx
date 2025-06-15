import { Link, NavLink } from "react-router";
import { useContext, useState } from "react";
//import { AuthContext } from "../../context/AuthContext";
import { Tooltip } from "react-tooltip";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logoutUser } = true;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-blue-500">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allItems" className="hover:text-blue-500">
          All Items
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/addItems" className="hover:text-blue-500">
              Add Item
            </NavLink>
          </li>
          <li>
            <NavLink to="/myItems" className="hover:text-blue-500">
              My Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/allRecovered" className="hover:text-blue-500">
              Recovered
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* Navbar Start (Mobile) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl text-blue-600 font-bold">
          <div className="flex justify-center items-center gap-1">
            <img src={logo} className="h-12 w-12 rounded-[50%]" alt="" />
            <h1 className="md:block hidden ">WhereIsIt</h1>
          </div>
        </Link>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Navbar End (Profile/Logout/Login) */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  data-tooltip-id="tooltip-profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="text-center font-medium">
                  {user.displayName}
                </span>
              </li>
              <li>
                <button
                  onClick={logoutUser}
                  className="text-red-500 font-semibold hover:bg-red-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
