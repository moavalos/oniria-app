import { EngineApiProvider } from "@/engine";
import { Leva } from "leva";
import { createBrowserRouter } from "react-router";
import { Dashboard, History, Home, Login, NotFound, Register } from "./pages";

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
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/historial",
    element: <History />,
  }
]);
