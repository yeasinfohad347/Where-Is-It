import React, { use } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const RecentItem = ({ promise }) => {
  const allItems = use(promise);

  const recentItems = [...allItems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <section className="px-4 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Find & Lost Items
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentItems.map((item, index) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
            </motion.div>
          ))}
        </div>

        {/* See All Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/allItems"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
          >
            See All
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentItem;
