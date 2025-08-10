import React from "react";

const FAQ = () => {
  return (
    <section className="bg-base-100 py-10 text-text">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm font-medium tracking-wider text-center uppercase text-primary">
          How it works
        </p>
        <h2 className="mb-8 text-4xl font-bold leading-none text-center sm:text-5xl text-accent">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              question: "How do I report a lost or found item?",
              answer:
                'Login to your account and navigate to the "Add Post" page. Fill in all required details like title, type (lost/found), category, date, location, and description to submit your post.',
              defaultChecked: true,
            },
            {
              question: "Can I search for specific lost or found items?",
              answer:
                'Yes, you can search items by title or location on the “All Items” page using the search input at the top. It filters results in real-time.',
            },
            {
              question: "Do I need an account to post or recover items?",
              answer:
                'Yes. Creating an account helps keep your posts secure and allows you to manage your submissions, recoveries, and updates easily.',
            },
            {
              question: "What happens when an item is recovered?",
              answer:
                'Once someone claims or returns an item, the recovery information is submitted. The item is marked as "Recovered" and removed from active listings.',
            },
            {
              question: "Can I edit or delete my post after submission?",
              answer:
                'Absolutely! Go to the "My Posts" page where you’ll find options to update your post or delete it entirely if needed.',
            },
            {
              question: "How do I create an account?",
              answer:
                'Click the "Sign Up" button in the top right corner and follow the registration process.',
            },
            {
              question: "I forgot my password. What should I do?",
              answer:
                'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
            },
            {
              question: "How do I update my profile information?",
              answer:
                'Go to "My Account" settings and select "Edit Profile" to make changes.',
            },
          ].map(({ question, answer, defaultChecked }, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow bg-base-100 border border-base-300"
            >
              <input type="radio" name="faq-accordion" defaultChecked={defaultChecked} />
              <div className="collapse-title font-semibold text-primary">{question}</div>
              <div className="collapse-content text-sm text-black">{answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
