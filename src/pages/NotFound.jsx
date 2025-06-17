import React from "react";
import { Link } from "react-router";
import { MdErrorOutline } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center text-center px-4">
      <Helmet>
        <tille>Error</tille>
      </Helmet>
      <MdErrorOutline className="text-7xl text-red-500 mb-4" />
      <h1 className="text-5xl font-bold text-blue-700 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
