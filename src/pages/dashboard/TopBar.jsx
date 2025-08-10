import React, { useState, useEffect, useRef, useContext } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { NavLink } from "react-router"; // react-router-dom instead of react-router
import { AuthContext } from "../../contexts/AuthContest";

const Topbar = ({ theme, toggleTheme, onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(AuthContext); // useContext, not use()

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-base-100 border-b border-base-300 shadow-sm sticky top-0 z-40">
      {/* Sidebar toggle button: visible only on small devices */}
      <button
        className="btn btn-ghost btn-circle md:hidden"
        onClick={onToggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
       
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-sm  flex items-center gap-1"
          aria-label="Toggle Theme"
          title="Toggle light/dark mode"
        >
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </button>

        {/* Profile button */}
        {user ? (
          <div
            className="avatar tooltip tooltip-bottom cursor-pointer"
            data-tip={user.displayName || "User"}
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL || "/default-avatar.png"} alt="User" />
            </div>
          </div>
        ) : (
          <button className="btn btn-ghost btn-circle" aria-label="Profile">
            <CgProfile size={22} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;
