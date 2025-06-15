import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../contexts/AuthContest";
import Loading from "./Loading";
// adjust path if needed

const PostDetails = () => {
  const item = useLoaderData();
  const { user } = useContext(AuthContext);

  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isRecovered, setIsRecovered] = useState(item.recovered || false);
  const [fakeRecoveryInfo, setFakeRecoveryInfo] = useState(null);

  if (!item || !user) {
    return <Loading />; // Loading spinner or "Please log in"
  }

  const handleSubmit = () => {
    const recoveryData = {
      itemId: item.id,
      recoveredLocation,
      recoveredDate: recoveredDate.toDateString(),
      recoveredBy: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    };

    setFakeRecoveryInfo(recoveryData);
    setIsRecovered(true);
    document.getElementById("my_modal_1").close(); // Close modal
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
      <p className="mb-2">{item.description}</p>
      <p>
        <strong>Status:</strong>{" "}
        {isRecovered ? "✅ Recovered" : "❌ Not Recovered"}
      </p>
      <p>
        <strong>Type:</strong> {item.type}
      </p>

      {!isRecovered && (
        <button
          className="mt-4 btn btn-primary"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
        </button>
      )}

      {isRecovered && fakeRecoveryInfo && (
        <div className="mt-4 text-green-600 font-semibold">
          ✅ This item was recovered on {fakeRecoveryInfo.recoveredDate} at{" "}
          {fakeRecoveryInfo.recoveredLocation} by{" "}
          {fakeRecoveryInfo.recoveredBy.name}.
        </div>
      )}

      {/* Modal using <dialog> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Confirm Recovery</h3>

          <label className="block mb-1">Recovered Location:</label>
          <input
            type="text"
            className="input input-bordered w-full mb-3"
            value={recoveredLocation}
            onChange={(e) => setRecoveredLocation(e.target.value)}
            placeholder="Enter recovered location"
          />

          <label className="block mb-1">Recovered Date:</label>
          <DatePicker
            selected={recoveredDate}
            onChange={(date) => setRecoveredDate(date)}
            className="input input-bordered w-full mb-3"
          />

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
            <form method="dialog" className="flex gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-success"
              >
                Submit
              </button>
              <button className="btn btn-ghost">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PostDetails;
