import { createContext, useContext, useMemo } from "react";

import { EngineAPI } from "../src/EngineAPI";

/**
 * Contexto para la API pública del motor 3D
 */
const EngineAPIContext = createContext<EngineAPI | null>(null);

/**
 * Proveedor que expone la API pública del motor para configurar salas y skins.
 * Permite a los componentes hijos acceder a métodos de configuración del motor
 * sin exponer la implementación interna.
 *
 * @param children - Componentes hijos que tendrán acceso a la API del motor
 * @returns Proveedor de contexto con la API del motor
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
 * Hook para acceder a la API pública del motor 3D.
 * Proporciona métodos para configurar salas, skins y obtener estado del motor.
 *
 * @returns Instancia de EngineAPI con métodos públicos del motor
 * @throws Error si se usa fuera del EngineApiProvider
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useEngineAPI() {
  const ctx = useContext(EngineAPIContext);
  if (!ctx) {
    throw new Error("useEngineAPI debe usarse dentro de EngineApiProvider");
  }
  return ctx;
}
