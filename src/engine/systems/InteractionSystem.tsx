import * as THREE from "three";
import { useEffect, useMemo, useState, useRef } from "react";
import { useEngineCore } from "../Engine";
import { useTransitions } from "../hooks";
import { useHandlers } from "../hooks/useHandlers";
import { button, useControls } from "leva";
import type { ObjectEvent, ObjectEventArray } from "../config/room.type";

export interface InteractionConfig {
  interactions?: Record<string, ObjectEventArray>;
  enableRaycasting?: boolean;
  raycastingLayers?: number[];
  debugMode?: boolean;
}

export interface InteractionSystemProps {
  config?: InteractionConfig;
  onHoverEnter?: (objectName: string, event: ObjectEvent) => void;
  onHoverLeave?: (objectName: string, event: ObjectEvent) => void;
  onClick?: (objectName: string, event: ObjectEvent) => void;
  onInteractionStateChange?: (hoveredObjects: string[]) => void;
  enableInteractions?: boolean;
  autoConfigureForRoom?: boolean;
  showDebugControls?: boolean;
}

export default function InteractionSystem({
  config = {},
  onHoverEnter,
  onHoverLeave,
  onClick,
  onInteractionStateChange,
  enableInteractions = true,
  autoConfigureForRoom = true,
  showDebugControls = true,
}: InteractionSystemProps) {
  const core = useEngineCore();
  const { activeRoom, loopService } = core;
  const interactionService = core.getInteractionService();
  const cameraService = core.getCameraService();
  const { viewNodes } = useTransitions();
  const { onEnter, onLeave, onClick: onClickHandler } = useHandlers();

  // Ref para objetos interactuables (como en la versión antigua)
  const interceptablesRef = useRef<Record<string, ObjectEventArray>>({});

  // Estado para lookAtables
  const [lookAtables, setLookAtables] = useState<Record<string, THREE.Vector3>>(
    {}
  );
  // Cargar objetos interactuables (versión simplificada como la antigua)
  useEffect(() => {
    if (!activeRoom || !enableInteractions) return;

    let mounted = true;

    const loadInteractables = async () => {
      try {
        // Cargar desde la habitación
        const roomInteractables = await activeRoom.getInteractableObjects();
        const roomLookAtables = await activeRoom.getLookAtableObjects();

        console.log("🔍 [InteractionSystem] Loaded interceptables:", roomInteractables);
        console.log("🔍 [InteractionSystem] Loaded lookAtables:", roomLookAtables);

        // Debug: listar todos los objetos de la escena
        if (activeRoom.getScene()) {
          const scene = activeRoom.getScene()!;
          const allObjects: string[] = [];
          scene.traverse((child) => {
            if (child.name) allObjects.push(child.name);
          });
          console.log("🏗️ [InteractionSystem] All scene objects:", allObjects);
        }

        if (!mounted) return;

        let newInteractables = { ...roomInteractables };

        // Sobrescribir/agregar con las interacciones de config
        if (config.interactions) {
          newInteractables = { ...newInteractables, ...config.interactions };
        }

        console.log("🔍 [InteractionSystem] Final interceptables:", newInteractables);
        interceptablesRef.current = newInteractables;
        setLookAtables(roomLookAtables);
      } catch (error) {
        console.error("❌ [InteractionSystem] Error loading room interactables:", error);
      }
    };

    loadInteractables();

    return () => {
      mounted = false;
    };
  }, [activeRoom, config.interactions, enableInteractions]);

  // Actualizar interacciones en el loop (como la versión antigua)
  useEffect(() => {
    if (
      !loopService ||
      !interactionService ||
      !activeRoom ||
      !enableInteractions
    )
      return;

    const cb = () => {
      const keys = Object.keys(interceptablesRef.current);
      if (keys.length > 0) {
        console.log("🔄 [InteractionSystem] Updating interactions, interceptables:", keys);
      }
      interactionService.update(activeRoom, interceptablesRef.current);
    };

    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, [loopService, interactionService, activeRoom, enableInteractions]);

  // Listeners de eventos (como la versión antigua)
  useEffect(() => {
    if (!interactionService || !enableInteractions) return;

    // Conectar eventos legacy para animaciones automáticas
    interactionService.on("hoverEnter", onEnter);
    interactionService.on("hoverLeave", onLeave);
    interactionService.on("click", onClickHandler);

    return () => {
      interactionService.off("hoverEnter");
      interactionService.off("hoverLeave");
      interactionService.off("click");
    };
  }, [
    interactionService,
    onEnter,
    onLeave,
    onClickHandler,
    enableInteractions,
  ]);

  // Configurar callbacks personalizados si se proporcionan (opcional)
  useEffect(() => {
    if (!interactionService || !enableInteractions) return;

    // Habilitar debug mode temporalmente para diagnóstico
    interactionService.setDebugMode(true);

    if (onHoverEnter) interactionService.setOnHoverEnter(onHoverEnter);
    if (onHoverLeave) interactionService.setOnHoverLeave(onHoverLeave);
    if (onClick) interactionService.setOnClick(onClick);
    if (onInteractionStateChange)
      interactionService.setOnStateChange(onInteractionStateChange);

    return () => {
      interactionService.setOnHoverEnter(undefined);
      interactionService.setOnHoverLeave(undefined);
      interactionService.setOnClick(undefined);
      interactionService.setOnStateChange(undefined);
    };
  }, [
    interactionService,
    onHoverEnter,
    onHoverLeave,
    onClick,
    onInteractionStateChange,
    enableInteractions,
  ]);

  // Creamos las opciones para el select de lookAtables
  const options = useMemo(() => Object.keys(lookAtables), [lookAtables]);

  // Controles de debug opcionales
  const debugControls = useMemo(() => {
    if (!showDebugControls) return null;

    return {
      reset: button(() => {
        cameraService?.setLookAt(
          new THREE.Vector3(-3.5, 3, 6),
          new THREE.Vector3(0, 1.8, 0),
          true
        );
      }),
      nodos: button(() => {
        cameraService?.setLookAt(
          new THREE.Vector3(-3.5, 3, 6),
          new THREE.Vector3(0, 1.8, 0),
          true
        );
        viewNodes({});
      }),
    };
  }, [showDebugControls, cameraService, viewNodes]);

  // Control con dropdown para cámara
  const cameraControls = useMemo(() => {
    if (!showDebugControls || options.length === 0) return null;

    return {
      target: {
        value: "scene",
        options,
      },
    };
  }, [showDebugControls, options]);

  // Controles de Leva (hooks siempre se ejecutan para evitar violations)
  const portalControlsConfig =
    showDebugControls && debugControls ? debugControls : {};
  const cameraControlsConfig =
    showDebugControls && cameraControls
      ? cameraControls
      : { target: { value: "scene", options: ["scene"] } };

  useControls("Portal", portalControlsConfig);
  const { target } = useControls("Camera", cameraControlsConfig);

  // Lógica para manejar el cambio de target
  useEffect(() => {
    if (!showDebugControls || !target || !cameraService || !lookAtables[target])
      return;

    const from = lookAtables[target];
    if (from) {
      cameraService.setLookAt(from, new THREE.Vector3(0, 0, 0), true);
    }
  }, [showDebugControls, target, cameraService, lookAtables]);

  return null;
}
