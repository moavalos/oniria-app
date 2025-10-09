import { createBrowserRouter } from "react-router";
import Home from "@pages/Home";
import Login from "@/app/pages/Login";
import Register from "@/app/pages/Register";
import NotFound from "@pages/NotFound";
import HistorialNodes from "./pages/Historial";
import Node from "./pages/Node";
import RegisterPage from "./pages/RegisterExample";
import Dashboard from "./pages/Dashboard";

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
    path: "/signup",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/historial",
    element: <HistorialNodes />,
  },
  {
    path: "/node/:id",
    element: <Node />,
  },
]);
