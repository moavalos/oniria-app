import { createBrowserRouter } from "react-router";
import Home from "@pages/Home";
import Login from "@pages/Login";
import NotFound from "@pages/NotFound";
import { EngineApiProvider } from "@/engine";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <EngineApiProvider>
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
