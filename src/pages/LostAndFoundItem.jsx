import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const LostAndFoundItem = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://where-is-it-server-topaz.vercel.app/allPost")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const filteredItems = items.filter((item) =>
    `${item.title} ${item.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <Helmet>
        <title>All Item</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
          What have you lost?
        </h2>

        {/* Search Box */}
        <div className="mb-8 text-center">
          <div className="relative w-full max-w-md mx-auto">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full shadow-md border border-blue-300 bg-white dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-5 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800 w-3/4">
                    {item.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.postType === "Lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.postType}
                  </span>
                </div>

                <p className="text-gray-600 mb-1">
                  <strong>Category:</strong> {item.category}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Date:</strong> {item.date}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-gray-500 line-clamp-2 flex-grow">
                  {item.description}
                </p>

                <Link
                  to={`/postDetails/${item._id}`}
                  className="mt-4 w-full inline-block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg mt-6">
              No posts found for your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostAndFoundItem;
