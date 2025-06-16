import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../contexts/AuthContest";
import Loading from "./Loading";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const PostDetails = () => {
  const item = useLoaderData();
  const { user } = useContext(AuthContext);
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isRecovered, setIsRecovered] = useState(item.recovered || false);
  const [postItem, setPostItem] = useState(item);

  if (!item || !user) return <Loading />;

  const handleSubmit = (e) => {
    e.preventDefault();

    const recoveredLocation = e.target.recoveredLocation.value;

    const recoveryData = {
      itemId: item._id,
      recoveredLocation,
      recoveredDate: recoveredDate.toDateString(),
      recoveredBy: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    };

    axios
      .post("http://localhost:3000/recoveredItems", recoveryData)
      .then(() => {
        return axios.patch(`http://localhost:3000/allPost/${item._id}`, {
          recovered: true,
          recoveredLocation,
          name: user.displayName,
        });
      })
      .then(() => {
        setIsRecovered(true);
        setPostItem({
          ...postItem,
          recovered: true,
          recoveredLocation,
          name: user.displayName,
        });
        toast.success("Item marked as recovered!");
        document.getElementById("my_modal_1").close();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong while submitting!");
      });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
      <p className="mb-2">{item.description}</p>
      <p>
        <strong>Status:</strong>{" "}
        {isRecovered ? "✅ Recovered" : "❌ Not Recovered"}
      </p>

      <div className="flex items-center  flex-wrap gap-4">
        <div>
          {isRecovered ? (
            <span>
              <strong>Recovered info:</strong> Recovered by {postItem.name} from{" "}
              {postItem.recoveredLocation}
            </span>
          ) : (
            <span>
              <strong>Type:</strong> {item.type}
            </span>
          )}
        </div>

        {!isRecovered && (
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            {item.type === "Lost" ? "Found This!" : "This is Mine!"}
          </button>
        )}
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Confirm Recovery</h3>
          <form onSubmit={handleSubmit}>
            <label className="block mb-1">Recovered Location:</label>
            <input
              type="text"
              name="recoveredLocation"
              className="input input-bordered w-full mb-3"
              placeholder="Enter recovered location"
              required
            />

            <label className="block mb-1">Recovered Date:</label>
            <DatePicker
              selected={recoveredDate}
              onChange={(date) => setRecoveredDate(date)}
              className="input input-bordered w-full mb-3"
              required
            />
            <ToastContainer />

            <div className="mb-4">
              <p>
                <strong>Name:</strong> {user.displayName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <img
                src={user.photoURL}
                alt="user"
                className="w-12 h-12 rounded-full mt-2"
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default PostDetails;
