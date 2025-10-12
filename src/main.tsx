import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { routes } from "@/app/routes";
import "@/i18n";
import { AuthProvider } from "@features/auth/context/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={routes} />
  </AuthProvider>
);