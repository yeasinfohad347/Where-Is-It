import React, { useEffect, useState } from "react";
import axios from "axios";

const SuccessfullyFoundSection = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/success-stories")
      .then((res) => setStories(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (stories.length === 0) {
    return (
      <div className="text-center text-gray-500 my-10">
        No success stories shared yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        Successfully Found Items
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white border border-green-300 shadow-md rounded-lg p-5"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              {story.itemName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Location:</strong> {story.foundLocation}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Date:</strong> {story.foundDate}
            </p>
            <p className="text-gray-700 italic">“{story.story}”</p>
            <div className="text-right text-xs mt-3 text-gray-500">
              – {story.userName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessfullyFoundSection;
