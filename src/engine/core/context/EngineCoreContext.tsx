import { createContext, useContext } from "react";
import { EngineCore } from "@engine/core";

/**
 * Contexto principal del núcleo del motor 3D
 */
export const EngineCoreContext = createContext<EngineCore | null>(null);

/**
 * Hook para acceder al núcleo del motor 3D desde componentes hijos.
 * Proporciona acceso completo a servicios, sistemas y estado del motor.
 *
 * @returns Instancia del núcleo del motor
 * @throws Error si se usa fuera del EngineCoreProvider
 */
export function useEngineCore() {
  const context = useContext(EngineCoreContext);
  if (!context) {
    throw new Error("useEngineCore debe usarse dentro de EngineCoreProvider");
  }
  return context;
}
