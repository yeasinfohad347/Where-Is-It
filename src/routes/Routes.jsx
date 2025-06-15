import { createBrowserRouter } from "react-router";

import HomeLayouts from "../layouts/HomeLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts/>
  },
]);

export default router;
