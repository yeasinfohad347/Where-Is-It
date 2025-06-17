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
    
      <div className="">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Banner />
      </div>
      <main>
        <Suspense fallback={<Loading/>}>
            <RecentItem promise={promise}></RecentItem >
        </Suspense>
        <SuccessPage/>
        <FAQ></FAQ>
      </main>

    </>
  );
};

export default Home;
