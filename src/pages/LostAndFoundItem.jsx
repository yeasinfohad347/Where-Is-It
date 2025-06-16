import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const LostAndFoundItem = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/allPost")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Lost & Found Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800 w-3/4">
                  {item.title}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    item.postType === "Lost"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.postType}
                </span>
              </div>

              <div className="flex-grow">
                <p className="text-gray-600 mb-2">
                  <strong>Category:</strong> {item.category}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Date:</strong> {item.date}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <Link
                to={`/postDetails/${item._id}`}
                className="mt-auto block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 rounded transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostAndFoundItem;
