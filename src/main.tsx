import { createRoot } from "react-dom/client";
import "./index.css";
import "@/app/i18n";
import { AuthProvider } from "@features/auth/context/AuthProvider";
import AuthRoute from "./app/routes/AuthRoute";
import { BrowserRouter } from "react-router-dom";
import { EngineApiProvider } from "./engine";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <EngineApiProvider>
      <BrowserRouter>
        <AuthRoute />
      </BrowserRouter>
    </EngineApiProvider>
  </AuthProvider>
);
