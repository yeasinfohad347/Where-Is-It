import { createBrowserRouter } from "react-router";

import HomeLayouts from "../layouts/HomeLayouts";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import LostAndFoundItem from "../pages/LostAndFoundItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "postDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allPost/${params.id}`),
        element: <PostDetails />,
      },
      {
        path:"allItems",
        element:<LostAndFoundItem/>
      },
    ],
  },
]);

export default router;
