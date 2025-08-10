import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Banner from "./Banner";
import RecentItem from "./RecentItem";
import Loading from "./Loading";
import FAQ from "./FAQ";
import SuccessPage from "./SuccessPage";
import { Helmet } from "react-helmet-async";

const promise = fetch("http://localhost:3000/allPost").then((res) =>
  res.json()
);

const Home = () => {
  return (
    <>
      {/* You may want to include Navbar here if not included globally */}
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Banner />
      </div>

      <main className="bg-base-100 text-text">
        <Suspense fallback={<Loading />}>
          <RecentItem promise={promise} />
        </Suspense>

        <SuccessPage />

        <FAQ />
      </main>
    </>
  );
};

export default Home;
