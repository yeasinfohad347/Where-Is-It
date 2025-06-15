import { createBrowserRouter } from "react-router";

import HomeLayouts from "../layouts/HomeLayouts";
import Login from "../pages/Login";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts/>,
    children:[
        {
            path:'/',
            index:true,
            element:<Home/>
        },
        {
            path:'/login',
            element:<Login/>
        }
    ]
  },
  
]);

export default router;
