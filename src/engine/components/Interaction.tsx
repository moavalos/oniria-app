import { useEffect } from "react";
import { useEngineCore } from "@engine/core";
import { EngineState } from "@engine/core";
import { useEngineState } from "@/engine/core/hooks/useEngineState";
import {
  InteractionSystem,
  type InteractionConfig,
} from "../systems/InteractionSystem";
import {
  OutlineSystem,
  type AutoOutlineConfig,
} from "../systems/OutlineSystem";

export interface InteractionProps {
  config?: Omit<InteractionConfig, "callbacks">;
  enableInteractions?: boolean;
  /** Configuración de outlines automáticos */
  outlines?: AutoOutlineConfig;
  /** Usar sistema con outlines automáticos (por defecto: true) */
  useOutlines?: boolean;
}

/**
 * Componente de sistema de interacciones del motor 3D.
 * Registra la clase InteractionSystem en el core con una API limpia para callbacks.
 *
 * @param config Configuración inicial de interacciones
 * @param objects Callbacks para interacciones con objetos
 * @param nodes Callbacks para interacciones con nodos
 * @param navigation Callbacks para navegación
 * @param enableInteractions Habilita o deshabilita las interacciones
 * @returns Componente React que no renderiza nada pero gestiona las interacciones
 *
 */
export function Interaction({
  config = {},
  enableInteractions = true,
  outlines = {},
  useOutlines = true,
}: InteractionProps) {
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
      enableInteractions,
      interactionRadius: 1.0,
      raycastThreshold: 0.1,
      ...config,
    };

    // Crear el sistema apropiado (con o sin outlines)
    let interactionSystem: InteractionSystem;

    if (useOutlines) {
      interactionSystem = new OutlineSystem(core, outlines);
    } else {
      interactionSystem = new InteractionSystem(finalConfig);
    }

    // Registrar el sistema en el core
    core.addSystem(interactionSystem);

    // Cleanup al desmontar - disponer el sistema
    return () => {
      interactionSystem.dispose();
    };
  }, [core, enableInteractions, isEngineReady, useOutlines, outlines]);

  return null;
}
