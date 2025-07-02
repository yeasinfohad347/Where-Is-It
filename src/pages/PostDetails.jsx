import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../contexts/AuthContest";
import Loading from "./Loading";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";

const PostDetails = () => {
  const item = useLoaderData();
  const { user } = useContext(AuthContext);
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isRecovered, setIsRecovered] = useState(item.recovered || false);
  const [postItem, setPostItem] = useState(item);

  if (!item || !user) return <Loading />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const recoveredLocation = form.recoveredLocation.value.trim();

    if (!recoveredLocation) {
      toast.error("Please enter a recovered location.");
      return;
    }

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
      .post("https://where-is-it-server-topaz.vercel.app/recoveredItems", recoveryData)
      .then(() =>
        axios.patch(`https://where-is-it-server-topaz.vercel.app/allPost/${item._id}`, {
          recovered: true,
          recoveredLocation,
          name: user.displayName,
        })
      )
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
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong while submitting!");
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-[#fafbf9] rounded-xl shadow-md border border-gray-200  ">
      <Helmet>
        <title>Post Details - {item.title}</title>
      </Helmet>

      <h1 className="text-3xl font-semibold mb-4 text-gray-900">{item.title}</h1>
      <p className="mb-4 text-gray-700 whitespace-pre-wrap">{item.description}</p>

      <p className="mb-6 text-gray-800 font-medium">
        <strong>Status:</strong> {isRecovered ? "✅ Recovered" : "❌ Not Recovered"}
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="text-gray-800">
          {isRecovered ? (
            <p>
              <strong>Recovered by:</strong> {postItem.name} from{" "}
              {postItem.recoveredLocation}
            </p>
          ) : (
            <p>
              <strong>Type:</strong> {item.type}
            </p>
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
          <h3 className="font-bold text-lg mb-4 text-gray-800">Confirm Recovery</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="recoveredLocation"
                className="block mb-1 font-medium text-gray-700"
              >
                Recovered Location:
              </label>
              <input
                type="text"
                name="recoveredLocation"
                id="recoveredLocation"
                className="input input-bordered w-full"
                placeholder="Enter recovered location"
                required
              />
            </div>

            <div>
              <label
                htmlFor="recoveredDate"
                className="block mb-1 font-medium text-gray-700"
              >
                Recovered Date:
              </label>
              <DatePicker
                id="recoveredDate"
                selected={recoveredDate}
                onChange={(date) => setRecoveredDate(date)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="border-l-4 border-green-500 p-4 bg-gray-100 rounded-md">
              <p>
                <strong>Name:</strong> {user.displayName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <img
                src={user.photoURL}
                alt="User"
                className="w-12 h-12 rounded-full mt-2"
              />
            </div>

            <div className="modal-action flex justify-end gap-2">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <ToastContainer />
    </div>
  );
};

export default PostDetails;
