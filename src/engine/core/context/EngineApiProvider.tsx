import { createContext, useContext, useMemo } from "react";
import { EngineAPI } from "../src/EngineAPI.class";

const EngineAPIContext = createContext<EngineAPI | null>(null);

/**
 * Provider que expone la API pública del motor para configurar salas y skins
 *
 * @param children - Componentes hijos que tendrán acceso a la API del motor
 */
export function EngineApiProvider({ children }: React.PropsWithChildren) {
  const api = useMemo(() => new EngineAPI(), []);

  return (
    <EngineAPIContext.Provider value={api}>
      {children}
    </EngineAPIContext.Provider>
  );
}

/**
 * Hook para acceder a la API pública del motor
 *
 * @returns API del motor con métodos para configurar salas y skins
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useEngineAPI() {
  const ctx = useContext(EngineAPIContext);
  if (!ctx)
    throw new Error("useEngineAPI debe usarse dentro de EngineApiProvider");
  return ctx;
}
