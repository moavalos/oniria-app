import { useEffect } from "react";
import { useEngineCore } from "@engine/core";
import { EngineState } from "@engine/core";
import { useEngineState } from "@/engine/core/hooks/useEngineState";
import {
  InteractionSystem,
  type InteractionConfig,
} from "../systems/InteractionSystem";

export interface InteractionProps {
  config?: InteractionConfig;
}

/**
 * Componente de sistema de interacciones del motor 3D.
 * Registra la clase InteractionSystem en el core con una API limpia para callbacks.
 *
 * @param config Configuración inicial de interacciones (incluye callbacks)
 * @returns Componente React que no renderiza nada pero gestiona las interacciones
 *
 */
export function Interaction({ config = {} }: InteractionProps) {
  const core = useEngineCore();

  // Usar el hook que se suscribe reactivamente a cambios de estado
  const engineState = useEngineState();
  const isEngineReady = engineState === EngineState.READY;

  // Registrar el InteractionSystem en el core
  useEffect(() => {
    if (!isEngineReady) {
      return;
    }

    // Configuración final
    const finalConfig: InteractionConfig = {
      interactionRadius: 1.0,
      raycastThreshold: 0.1,
      ...config,
    };

    // Crear el sistema apropiado (con o sin outlines)
    const interactionSystem = new InteractionSystem(finalConfig);

    // Registrar el sistema en el core
    core.addSystem(interactionSystem);

    // Cleanup al desmontar - disponer el sistema
    return () => {
      interactionSystem.dispose();
    };
  }, [core, isEngineReady]);

  return null;
}
