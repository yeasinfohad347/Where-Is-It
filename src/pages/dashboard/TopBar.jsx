import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { NavLink } from "react-router";


const Topbar = ({ theme, toggleTheme, onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        {/* Dropdown menu: visible md and up */}
        <div
          className="relative hidden md:block"
          ref={dropdownRef}
        >
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-label="Open menu"
            className="btn btn-ghost btn-circle"
          >
            <FaEllipsisV size={24} />
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 p-2 bg-base-100 shadow rounded-box space-y-2 z-50">
              <li>
                <NavLink
                  to="/dashboard/addPost"
                  className="justify-start"
                  onClick={() => setDropdownOpen(false)}
                >
                  Add Item
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/recovered"
                  className="justify-start"
                  onClick={() => setDropdownOpen(false)}
                >
                  Recovery Item
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myPost"
                  className="justify-start"
                  onClick={() => setDropdownOpen(false)}
                >
                  Manage My Item
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-sm btn-accent flex items-center gap-1"
          aria-label="Toggle Theme"
          title="Toggle light/dark mode"
        >
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </button>

        {/* Profile button */}
        <button className="btn btn-ghost btn-circle" aria-label="Profile">
          <CgProfile size={22} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
