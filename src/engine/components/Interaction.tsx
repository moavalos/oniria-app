import { useEffect } from "react";
import { useEngineCore } from "@engine/core";
import { EngineState } from "@engine/core";
import { useEngineState } from "@engine/hooks/useEngineState";
import {
  InteractionSystem,
  type InteractionConfig,
  type InteractionCallbacks,
  type ObjectInteractionCallbacks,
  type NodeInteractionCallbacks,
  type NavigationCallbacks,
} from "@engine/systems/InteractionSystem";

export interface InteractionProps {
  config?: Omit<InteractionConfig, "callbacks">;
  // Callbacks organizados por categoría
  objects?: ObjectInteractionCallbacks;
  nodes?: NodeInteractionCallbacks;
  navigation?: NavigationCallbacks;
  // Configuración
  enableInteractions?: boolean;
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
  objects,
  nodes,
  navigation,
  enableInteractions = true,
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

    // Consolidar callbacks con backward compatibility
    const consolidatedCallbacks: InteractionCallbacks = {
      objects: {
        onHover: objects?.onHover,
        onHoverLeave: objects?.onHoverLeave,
        onClick: objects?.onClick,
      },
      nodes: {
        onHover: nodes?.onHover,
        onHoverLeave: nodes?.onHoverLeave,
        onClick: nodes?.onClick,
      },
      navigation: navigation || {},
    };

    // Configuración final
    const finalConfig: InteractionConfig = {
      enableInteractions,
      interactionRadius: 1.0,
      raycastThreshold: 0.1,
      ...config,
      callbacks: consolidatedCallbacks,
    };

    // Crear e instanciar el sistema de interacciones
    const interactionSystem = new InteractionSystem(finalConfig);

    // Registrar el sistema en el core
    core.addSystem(interactionSystem);

    // Cleanup al desmontar - disponer el sistema
    return () => {
      interactionSystem.dispose();
    };
  }, [
    core,
    config,
    enableInteractions,
    isEngineReady,
    engineState,
    objects,
    nodes,
    navigation,
  ]);

  return null;
}
