import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaHome, FaListAlt, FaPlusCircle, FaRecycle } from "react-icons/fa";
import SideBar from "./SideBar";
import Topbar from "./TopBar";


const DashboardLayout = () => {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Sidebar desktop and mobile slide-in */}
      {/* Large device: always visible */}
      <aside className="hidden lg:flex w-64 bg-primary text-secondary flex-col p-4 shadow-lg sticky top-0 h-screen">
        <SideBar />
      </aside>

      {/* Mobile sidebar with slide in/out */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-secondary p-4 shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar
          theme={theme}
          toggleTheme={toggleTheme}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
