import { createBrowserRouter } from "react-router"; 
import HomeLayouts from "../layouts/HomeLayouts";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import LostAndFoundItem from "../pages/LostAndFoundItem";
import AddLostAndFoundItem from "../pages/AddLostAndFoundItem";
import PrivateRoutes from "./PrivateRoutes";
import MyItem from "../pages/MyItem";
import UpdateItem from "../pages/UpdateItem";
import RecoveredItem from "../pages/RecoveredItem";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import StatsPage from "../pages/dashboard/StatsPage";
import AboutUs from "../pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "aboutUs",
        element: <AboutUs/>
      },
      {
        path: "postDetails/:id",
        loader: ({ params }) =>
          fetch(`https://where-is-it-server-topaz.vercel.app/allPost/${params.id}`, {
            credentials: "include",
          }),
        element: <PostDetails />,
      },
      {
        path: "allItems",
        element: <LostAndFoundItem />,
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoutes>
            <UpdateItem />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index:true,
        element: <StatsPage />,
      },
      {
        path: "addPost",
        element: <AddLostAndFoundItem />,
      },
      {
        path: "myPost",
        element: <MyItem />,
      },
      {
        path: "recovered",
        element: <RecoveredItem />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
