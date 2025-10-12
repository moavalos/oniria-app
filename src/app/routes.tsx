import { Home, History, Login, Register, NotFound } from "./pages";
import { EngineApiProvider } from "@/engine";
import { Leva } from "leva";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "@/app/features/auth/components/PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <EngineApiProvider>
          <Leva collapsed />
          <Home />
        </EngineApiProvider>
      </PrivateRoute>
    ),
  },
  {
    path: "/historial",
    element: (
      <PrivateRoute>
        <History />
      </PrivateRoute>
    ),
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
