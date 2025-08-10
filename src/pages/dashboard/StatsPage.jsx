import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContest";
import axios from "axios";

const StatsPage = () => {
  const { user } = useContext(AuthContext);
  const [allItems, setAllItems] = useState([]);
  const [myItem, setMyItem] = useState([]);
  const [recoveredItems, setRecoveredItems] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    // Fetch all items
    fetch("https://where-is-it-server-topaz.vercel.app/allPost")
      .then((res) => res.json())
      .then((data) => setAllItems(data))
      .catch((err) => console.error(err));

    // Fetch recovered items
    axios
      .get("https://where-is-it-server-topaz.vercel.app/recovered", {
        withCredentials: true,
      })
      .then((res) => {
        setRecoveredItems(res.data);
      })
      .catch((err) => {});

    // Fetch all users
    fetch(`https://where-is-it-server-topaz.vercel.app/myPost?email=${user.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMyItem(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Sort recent items by createdAt descending
  const recentItems = [...allItems]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 text-text bg-base-100">
      <h1 className="text-3xl font-bold mb-8 text-accent">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="card bg-primary-color  p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Items</h2>
          <p className="text-4xl font-bold">{allItems.length}</p>
        </div>

        <div className="card bg-secondary-color text-text p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">My Items</h2>
          <p className="text-4xl font-bold">{myItem.length}</p>
        </div>

        <div className="card bg-accent-color  p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recovered Items</h2>
          <p className="text-4xl font-bold">{recoveredItems.length}</p>
        </div>
      </div>

      {/* Recent Added Items */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-accent">
          Recently Added Items
        </h2>
        {recentItems.length === 0 ? (
          <p className="text-secondary">No items found.</p>
        ) : (
          <ul className="space-y-4">
            {recentItems.map((item) => (
              <li
                key={item._id || item.id}
                className="border border-secondary rounded-lg p-4 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">
                  {item.title || item.itemName || "Unnamed Item"}
                </h3>
                <p className="text-sm ">
                  Category: {item.category || "N/A"} | Type:{" "}
                  {item.type || "N/A"}
                </p>
                <p className="text-sm ">
                  Added on: {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2">{item.description?.slice(0, 100)}...</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default StatsPage;
