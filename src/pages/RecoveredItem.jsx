import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContest";
import { MdViewList, MdViewModule } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const RecoveredItem = () => {
  const { user } = useContext(AuthContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [isTableView, setIsTableView] = useState(false);
  const [isCardView,setIsCardView]=useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get("https://where-is-it-server-topaz.vercel.app/recovered",{
          withCredentials:true
        })
        .then((res) => {
          setRecoveredItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          
        });
    }
  }, [user]);

  const toggleLayout1 = () => {
    setIsTableView(true)
    setIsCardView(false)
  };
  const toggleLayout2 = () => {
    setIsTableView(false)
    setIsCardView(true)
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (recoveredItems.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No recovered items found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Helmet>
        <title>Recovered Item</title>
      </Helmet>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Recovered Items</h2>
        <div className="flex gap-5">
          <button
          onClick={toggleLayout1}
          className="text-3xl text-blue-600 hover:text-blue-800 transition"
          
        ><MdViewModule /></button>
        <button
          onClick={toggleLayout2}
          className="text-3xl text-blue-600 hover:text-blue-800 transition"
          
        ><MdViewList /></button>
        </div>
          {/* {isTableView ?  : }
        </button> */}
      </div>

      {isTableView ? (
        // Table Layout
        <div className="overflow-x-auto border rounded shadow">
          <table className="table w-full">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.recoveredLocation}</td>
                  <td>{item.recoveredDate}</td>
                  <td className="text-green-600 font-semibold">Recovered</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card Layout
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border shadow-md rounded-lg p-4"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-blue-600">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {item.recoveredLocation}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {item.recoveredDate}
              </p>
              <span className="text-green-600 font-semibold text-sm mt-2 inline-block">
                Recovered
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveredItem;
