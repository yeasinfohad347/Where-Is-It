import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContest";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const MyItem = () => {
  const [myItems, setMyItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/myPost?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyItems(data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [user]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:3000/allPost/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Item deleted successfully!");
            setMyItems(myItems.filter((item) => item._id !== id));
          }
        })
        .catch(() => toast.error("Failed to delete item"));
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Manage My Items</h2>

      {myItems.length === 0 ? (
        <p className="text-gray-600 text-lg">No items found. Add some posts!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.postType}</td>
                  <td>{item.location}</td>
                  <td>
                    {item.recovered ? (
                      <span className="text-green-600 font-semibold">Recovered</span>
                    ) : (
                      <span className="text-red-500">Not Recovered</span>
                    )}
                  </td>
                  <td className="flex gap-2 justify-center">
                    <Link to={`/update/${item._id}`}>
                      <button className="btn btn-sm btn-info">Update</button>
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyItem;
