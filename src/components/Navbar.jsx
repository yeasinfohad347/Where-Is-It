import { NavLink, Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContest";
import Toggole from "./Toggole";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut().catch((err) => {});
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm btn-primary text-white font-semibold"
              : "btn btn-sm btn-ghost font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allItems"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm btn-primary text-white font-semibold"
              : "btn btn-sm btn-ghost font-medium"
          }
        >
          Lost & Found Items
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive
              ? "btn btn-sm btn-primary text-white font-semibold"
              : "btn btn-sm btn-ghost font-medium"
          }
        >
          About Us
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-sm btn-primary text-white font-semibold"
                  : "btn btn-sm btn-ghost font-medium"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100 w-full shadow">
      <div className="w-11/12 mx-auto py-2">
        <div className="navbar flex items-center justify-between">
          {/* Navbar Start */}
          <div className="navbar-start flex items-center gap-4">
            <NavLink to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-12 w-12 rounded-full" />
              <span className="text-2xl font-bold text-primary hidden md:block">
                WhereIsIt
              </span>
            </NavLink>

            {/* Dropdown (mobile) */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h10m-10 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
              >
                {navLinks}
              </ul>
            </div>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end flex items-center gap-3">
            <Toggole handleToggle={handleToggle} />
            {user ? (
              <>
                {/* Avatar */}
                <Link to="/myProfile">
                  <div
                    className="avatar tooltip tooltip-bottom"
                    data-tip={user.displayName}
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="User"
                      />
                    </div>
                  </div>
                </Link>
                {/* Logout */}
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm btn-error text-white hover:bg-error/90"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm btn-primary text-white font-semibold"
                      : "btn btn-sm btn-primary btn-outline hover:bg-primary hover:text-white"
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-sm btn-primary text-white font-semibold"
                      : "btn btn-sm btn-primary btn-outline hover:bg-secondary hover:text-white"
                  }
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
