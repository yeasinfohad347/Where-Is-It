import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../contexts/AuthContest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loading from "./Loading";

const AddLostAndFoundItem = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  if(!user){
    return <Loading></Loading>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newPost = {
      type: form.postType.value,
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      date: date.toDateString(),
      contact: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
      recovered: false,
    };

    fetch("http://localhost:3000/allPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Post added successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add post.");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white border border-blue-400 shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Add Lost & Found Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Type */}
          <div>
            <label className="block font-medium">Post Type:</label>
            <select name="postType" className="select select-bordered w-full border-blue-300" required>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block font-medium">Thumbnail URL:</label>
            <input
              name="thumbnail"
              type="text"
              className="input input-bordered w-full border-blue-300"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium">Title:</label>
            <input
              name="title"
              type="text"
              className="input input-bordered w-full border-blue-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full border-blue-300"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium">Category:</label>
            <input
              name="category"
              type="text"
              className="input input-bordered w-full border-blue-300"
              placeholder="e.g., pets, gadgets, documents"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium">Location:</label>
            <input
              name="location"
              type="text"
              className="input input-bordered w-full border-blue-300"
              required
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block font-medium">Date Lost or Found:</label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="input input-bordered w-full border-blue-300"
            />
          </div>

          {/* Contact Info */}
          <div className="bg-gray-100 p-3 rounded border border-gray-300 shadow-inner">
            <p><strong>Contact Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full mt-2 border border-blue-400" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full shadow-md">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLostAndFoundItem;
