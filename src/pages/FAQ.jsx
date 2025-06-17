import React from "react";

const FAQ = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-100  py-10">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm font-medium tracking-wider text-center uppercase text-blue-600">
          How it works
        </p>
        <h2 className="mb-8 text-4xl font-bold leading-none text-center sm:text-5xl">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title font-semibold">
              How do I report a lost or found item?
            </div>
            <div className="collapse-content text-sm">
              Login to your account and navigate to the "Add Post" page. Fill
              in all required details like title, type (lost/found), category,
              date, location, and description to submit your post.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              Can I search for specific lost or found items?
            </div>
            <div className="collapse-content text-sm">
              Yes, you can search items by title or location on the “All
              Items” page using the search input at the top. It filters
              results in real-time.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              Do I need an account to post or recover items?
            </div>
            <div className="collapse-content text-sm">
              Yes. Creating an account helps keep your posts secure and allows
              you to manage your submissions, recoveries, and updates easily.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              What happens when an item is recovered?
            </div>
            <div className="collapse-content text-sm">
              Once someone claims or returns an item, the recovery information
              is submitted. The item is marked as "Recovered" and removed from
              active listings.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              Can I edit or delete my post after submission?
            </div>
            <div className="collapse-content text-sm">
              Absolutely! Go to the "My Posts" page where you’ll find options
              to update your post or delete it entirely if needed.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              How do I create an account?
            </div>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the registration process.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              I forgot my password. What should I do?
            </div>
            <div className="collapse-content text-sm">
              Click on "Forgot Password" on the login page and follow the instructions sent to your email.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-sm">
              Go to "My Account" settings and select "Edit Profile" to make changes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
