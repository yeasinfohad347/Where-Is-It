import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../contexts/AuthContest";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateItem = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetch(`https://where-is-it-server-topaz.vercel.app/allPost/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        const parsedDate = new Date(data.date);
        if (!isNaN(parsedDate)) {
          setDate(parsedDate);
        }
      })
      .catch(() => toast.error("Failed to fetch item data."));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedPost = {
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
    };
    

    fetch(`https://where-is-it-server-topaz.vercel.app/allPost/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Item updated successfully",
          icon: "success",
        });
        navigate("/");
      })
      .catch(() => toast.error("Failed to update item."));
  };

  if (!item) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Helmet>
        <title>Update Item</title>
      </Helmet>
      <ToastContainer />
      <div className="rounded-lg p-6 border border-secondary shadow-lg bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Update Item Post
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4 text-base-content">
          {/* Post Type */}
          <div>
            <label className="block font-medium">Post Type:</label>
            <select
              name="postType"
              defaultValue={item.type}
              className="select select-bordered w-full border-primary"
              required
            >
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
              defaultValue={item.thumbnail}
              className="input input-bordered w-full border-primary"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium">Title:</label>
            <input
              name="title"
              type="text"
              defaultValue={item.title}
              className="input input-bordered w-full border-primary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              name="description"
              defaultValue={item.description}
              className="textarea textarea-bordered w-full border-primary"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium">Category:</label>
            <input
              name="category"
              type="text"
              defaultValue={item.category}
              className="input input-bordered w-full border-primary"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium">Location:</label>
            <input
              name="location"
              type="text"
              defaultValue={item.location}
              className="input input-bordered w-full border-primary"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium">Date Lost or Found:</label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="input input-bordered w-full border-primary"
            />
          </div>

          {/* Contact */}
          <div className="p-3 rounded shadow-inner bg-secondary text-base-content">
            <p>
              <strong>Name:</strong> {user.displayName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <img
              src={user.photoURL}
              alt="User"
              className="w-12 h-12 rounded-full mt-2 border border-primary"
            />
          </div>

          {/* Update Button */}
          <button type="submit" className="btn w-full bg-primary text-white">
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
