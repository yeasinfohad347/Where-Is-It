import { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../contexts/AuthContest";
import { toast, ToastContainer } from "react-toastify";

const SuccessPage = () => {
  const [stories, setStories] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch stories
  useEffect(() => {
    fetch("https://where-is-it-server-topaz.vercel.app/success-stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.error(err));
  }, []);

  // Submit success story
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newStory = {
      itemName: form.itemName.value,
      foundLocation: form.location.value,
      foundDate: form.date.value,
      story: form.story.value,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "N/A",
    };

    fetch("https://where-is-it-server-topaz.vercel.app/success-stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStory),
    })
      .then(() => {
        toast.success("Thank you for sharing your story!");
        // Fetch updated stories
        return fetch(
          "https://where-is-it-server-topaz.vercel.app/success-stories"
        );
      })
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        form.reset();
      })
      .catch((err) => {
        toast.error("Failed to submit story");
        console.error(err);
      });
  };

  // Slider settings
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="my-16 px-6 max-w-7xl mx-auto text-center">
      <ToastContainer />
      <h2 className="text-4xl font-bold mb-4 text-green-600">
        🎉 Success Stories
      </h2>
      <p className="text-gray-600 mb-10">
        Real stories of people who found their lost items!
      </p>

      {stories.length === 0 ? (
        <p className="text-gray-500 text-lg">No stories shared yet.</p>
      ) : (
        <Slider {...settings} className="!py-6">
          {stories.map((story, index) => (
            <div key={index} className="px-2">
              <div className="bg-white m-6 p-6 rounded-2xl shadow-md h-full flex flex-col justify-start items-center text-left min-h-[300px]">
                <h3 className="text-xl font-bold text-green-700 text-center mb-2">
                  {story.itemName}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Location:</strong> {story.foundLocation}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Date:</strong> {story.foundDate}
                </p>
                <p className="text-gray-700 italic mt-3">“{story.story}”</p>
                <p className="text-xs text-right text-gray-500 mt-4 w-full">
                  – {story.userName}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}

      {/* Submit Form */}
      <div className="mt-16 text-left max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-center text-green-700 dark:text-green-400">
          ✍️ Share Your Success Story
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Item Name"
            name="itemName"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Found Location"
            name="location"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
          <input
            type="date"
            name="date"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <textarea
            placeholder="Your Story"
            name="story"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
          >
            Submit Story
          </button>
        </form>
      </div>
    </section>
  );
};

export default SuccessPage;
