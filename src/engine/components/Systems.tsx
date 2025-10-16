import { Camera } from "./Camera";
import { Animation } from "./Animation";
import { Interaction } from "./Interaction";

/**
 * Namespace para organizar los componentes de sistema del motor
 * Patrón: System.ComponenteName
 */
export const System = {
  Camera,
  Animation,
  Interaction,
} as const;

// Export default para compatibilidad
export default System;
