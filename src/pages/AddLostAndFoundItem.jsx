import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../contexts/AuthContest"; 
import { useNavigate } from "react-router"; 
import Loading from "./Loading";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddLostAndFoundItem = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  if (!user) return <Loading />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newPost = {
      postType: form.postType.value,
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

    axios
      .post("https://where-is-it-server-topaz.vercel.app/allPost", newPost)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Post Added!",
          text: "Your lost/found item has been posted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "There was a problem adding your post.",
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Helmet>
        <title>Add Lost Item</title>
      </Helmet>

      <div className="bg-background border border-secondary shadow-xl rounded-xl p-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-primary">
          Add Lost & Found Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type */}
          <div>
            <label className="block text-lg font-semibold mb-1">Post Type:</label>
            <select
              name="postType"
              className="select w-full border border-secondary rounded-md"
              required
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-lg font-semibold mb-1">Thumbnail URL:</label>
            <input
              name="thumbnail"
              type="text"
              placeholder="https://image-url.com/item.jpg"
              className="input w-full border border-secondary rounded-md"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-lg font-semibold mb-1">Title:</label>
            <input
              name="title"
              type="text"
              className="input w-full border border-secondary rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold mb-1">Description:</label>
            <textarea
              name="description"
              rows={4}
              className="textarea w-full border border-secondary rounded-md"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-semibold mb-1">Category:</label>
            <input
              name="category"
              type="text"
              placeholder="e.g., pets, gadgets, documents"
              className="input w-full border border-secondary rounded-md"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-lg font-semibold mb-1">Location:</label>
            <input
              name="location"
              type="text"
              className="input w-full border border-secondary rounded-md"
              required
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-lg font-semibold mb-1">Date Lost or Found:</label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="input w-full border border-secondary rounded-md"
            />
          </div>

          {/* Contact Info */}
          <div className="bg-background p-4 rounded-md border border-secondary shadow-sm">
            <p><strong>Contact Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <img
              src={user.photoURL}
              alt="User"
              className="w-14 h-14 rounded-full mt-3 border border-primary shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary hover:bg-accent text-white text-lg font-semibold transition"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLostAndFoundItem;
