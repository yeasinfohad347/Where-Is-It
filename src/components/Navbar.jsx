import { Link, NavLink } from "react-router";
import { useContext } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContest";
import { div } from "motion/react-client";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log("sign out");
      })
      .catch((err) => {
        const error = err.message;
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-blue-500">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allItems" className="hover:text-blue-500">
          Lost & Found Items
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-11/12 mx-auto">
      <div className="navbar">
        {/* Navbar Start */}
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
          <Link
            to="/"
            className=" text-xl text-blue-600 font-bold"
          >
            <div className="flex items-center gap-1">
              <img src={logo} className="h-12 w-12 rounded-full" alt="logo" />
              <span className="hidden md:block">WhereIsIt</span>
            </div>
          </Link>
        </div>

        {/* Navbar Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end ">
          {user ? (
            <div className="flex justify-center items-center gap-1">
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                  data-tip={user.displayName}
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Profile"
                      src={user.photoURL || "/default-avatar.png"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <span className="justify-between font-medium">
                      {user.displayName}
                    </span>
                  </li>
                  <div className="divider my-1"></div>
                  {/* Private Routes in Profile Dropdown */}
                  <li>
                    <Link to="/addPost">Add Lost & Found Item</Link>
                  </li>
                  <li>
                    <Link to="/recovered">All Recovered Items</Link>
                  </li>
                  <li>
                    <Link to="/myPost">Manage My Items</Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <button
                  onClick={handleLogOut}
                  className="w-full px-2 py-1 text-white bg-red-500 rounded-md font-semibold hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <Link
                to="/register"
                className="btn btn-sm bg-blue-700 text-white hover:bg-blue-600"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
