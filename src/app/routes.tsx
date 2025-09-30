import { createBrowserRouter } from "react-router";
import Home from "@pages/Home";
import Login from "@/app/pages/Login";
import Register from "@/app/pages/Register";
import NotFound from "@pages/NotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
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
    path: "*",
    element: <NotFound />,
  },
]);
