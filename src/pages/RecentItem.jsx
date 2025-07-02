import React, { use } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const RecentItem = ({ promise }) => {
  const allItems = use(promise);

  const recentItems = [...allItems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <section className="px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-extrabold text-center text-blue-700 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Find & Lost Items
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentItems.map((item, index) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 w-3/4 leading-snug">
                    {item.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      item.postType === "Lost"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.postType}
                  </span>
                </div>

                <div className="flex-grow space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Date:</strong> {item.date}
                  </p>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p className="line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <Link
                  to={`/postDetails/${item._id}`}
                  className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded-md transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See All Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/allItems"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-700 transition"
          >
            See All Items
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentItem;
