import { createBrowserRouter } from "react-router";
import Home from "@pages/Home";
import Login from "@pages/Login";
import NotFound from "@pages/NotFound";
import { EngineApiProvider } from "@/engine";
import { Leva } from "leva";

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
    path: "*",
    element: <NotFound />,
  },
]);
