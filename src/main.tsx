import { createRoot } from "react-dom/client";
import "./index.css";
import "@/app/i18n";
import { AuthProvider } from "@features/auth/context/AuthProvider";
import AuthRoute from "./app/routes/AuthRoute";
import { BrowserRouter } from "react-router-dom";
import { EngineApiProvider } from "./engine";
import { initializeTheme } from "@/app/features/dark-mode";

// Inicializar el tema antes de renderizar
initializeTheme();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <EngineApiProvider>
      <BrowserRouter>
        <AuthRoute />
      </BrowserRouter>
    </EngineApiProvider>
  </AuthProvider>
);
