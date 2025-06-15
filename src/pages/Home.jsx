import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Banner from "./Banner";
import RecentItem from "./RecentItem";

const promise = fetch("http://localhost:3000/allPost").then((res) =>
  res.json()
);

const Home = () => {
  return (
    <>
      <div className="">
        <Banner />
      </div>
      <main>
        <Suspense>
            <RecentItem promise={promise}></RecentItem >
        </Suspense>
      </main>
    </>
  );
};

export default Home;
