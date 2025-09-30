import { createBrowserRouter } from "react-router";
import Home from "@pages/Home";
import Login from "@/app/pages/Login";
import NotFound from "@pages/NotFound";
import HistorialNodes from "./pages/Historial";

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
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/historial",
    element: <HistorialNodes />,
  },
]);
