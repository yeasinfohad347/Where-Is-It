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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    errorElement:<NotFound/>,
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
          fetch(`https://where-is-it-server-topaz.vercel.app/allPost/${params.id}`,{
            credentials:'include'
          }),
        element: <PrivateRoutes><PostDetails /></PrivateRoutes>,
      },
      {
        path:"allItems",
        element:<LostAndFoundItem/>
      },
      {
        path:'/addPost',
        element:<PrivateRoutes><AddLostAndFoundItem/></PrivateRoutes>
      },
      {
        path:'/myPost',
        element:<PrivateRoutes><MyItem/></PrivateRoutes>
      },
      {
        path:'/update/:id',
        element:<PrivateRoutes><UpdateItem/></PrivateRoutes>
      }
      ,
      {
        path:'/recovered',
        element:<PrivateRoutes><RecoveredItem/></PrivateRoutes>
      }
    ],
  },
  {
    path:'*',
    element:<NotFound></NotFound>
  }
]);

export default router;
