import { createBrowserRouter } from "react-router";
import Home from "@pages/Home";
import Login from "@/app/pages/Login";
import Register from "@/app/pages/Register";
import Node from "@/app/pages/Node";
import NotFound from "@pages/NotFound";
import { EngineApiProvider } from "@/engine";
import { Leva } from "leva";
import RegisterPage from "./pages/RegisterExample";
import Dashboard from "./pages/Dashboard";
import HistorialNodes from "./pages/Historial";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <EngineApiProvider>
        <Leva collapsed />
        <Home />
      </EngineApiProvider>
    ),
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
