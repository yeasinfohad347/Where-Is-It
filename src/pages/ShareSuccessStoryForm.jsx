import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContest";
import axios from "axios";
import { toast } from "react-toastify";

const ShareSuccessStoryForm = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const storyData = {
      itemName: form.itemName.value,
      foundLocation: form.location.value,
      foundDate: form.date.value,
      story: form.story.value,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email,
    };

    setLoading(true);
    axios
      .post("http://localhost:3000/success-stories", storyData)
      .then(() => {
        toast.success("Thank you for sharing your story!");
        form.reset();
      })
      .catch((err) => {
        toast.error("Failed to submit story");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Share Your Success Story
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Found Location"
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="date"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="story"
          placeholder="Your story..."
          className="textarea textarea-bordered w-full"
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          className="btn btn-success w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Share Story"}
        </button>
      </form>
    </div>
  );
};

export default ShareSuccessStoryForm;
