import { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../contexts/AuthContest"; // Fixed typo here
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessPage = () => {
  const [stories, setStories] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://where-is-it-server-topaz.vercel.app/success-stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.error(err));
  }, []);

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
    <section className="my-16  max-w-7xl mx-auto text-text bg-base-100">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-accent mb-2">
          🎉 Success Stories
        </h2>
        <p className="text-black">
          Real stories from people who found their lost items!
        </p>
      </div>

      {/* Stories Slider */}
      {stories.length === 0 ? (
        <p className="text-secondary text-lg text-center">
          No stories shared yet.
        </p>
      ) : (
        <Slider {...settings} className="!py-6">
          {stories.map((story, index) => (
            <div key={story._id || index} className="px-3">
              <div className="relative bg-base-100 border-l-4 border-accent p-6 rounded-xl shadow-md h-full min-h-[300px] transition hover:shadow-lg">
                <h3 className="text-xl font-bold text-accent text-center mb-2">
                  {story.itemName}
                </h3>
                <p className="text-black text-sm mb-1">
                  <strong>Location:</strong> {story.foundLocation}
                </p>
                <p className="text-black text-sm mb-1">
                  <strong>Date:</strong> {story.foundDate}
                </p>
                <p className="text-text italic mt-3">“{story.story}”</p>
                <p className="text-secondary text-xs text-right mt-4">
                  – {story.userName}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}

      {/* Submit Form */}
      <div className="mt-20 mx-auto max-w-6xl">
        <h3 className="text-2xl font-bold mb-6 text-center text-accent">
          ✍️ Share Your Success Story
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            className="w-full p-3 border border-primary rounded-xl bg-base-100  "
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Found Location"
            className="w-full p-3 border border-primary rounded-xl bg-base-100  "
            required
          />
          <input
            type="date"
            name="date"
            className="w-full p-3 border border-primary rounded-xl bg-base-100  "
            required
          />
          <textarea
            name="story"
            placeholder="Your Story"
            rows={4}
            className="w-full p-3 border border-primary rounded-xl bg-base-100  "
            required
          ></textarea>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary px-6 py-2 rounded-xl"
            >
              Submit Story
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SuccessPage;
