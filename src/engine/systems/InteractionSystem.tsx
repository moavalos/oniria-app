import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useEngineCore } from "../Engine";
import { useHandlers, useTransitions } from "../hooks";
import { button, useControls } from "leva";
import type { ObjectEventArray } from "../config/room.type";

export interface InteractionSystemProps {
  // Event callbacks
  onObjectHoverEnter?: (objectName: string, events: ObjectEventArray) => void;
  onObjectHoverLeave?: (objectName: string, events: ObjectEventArray) => void;
  onObjectClick?: (objectName: string, events: ObjectEventArray) => void;
  onInteractionStateChange?: (hoveredObjects: string[]) => void;

  // Configuration
  enableInteractions?: boolean;
  enableDebugControls?: boolean;
  debugControlsConfig?: {
    showPortalControls?: boolean;
    showCameraControls?: boolean;
  };
}

export default function InteractionSystem({
  onObjectHoverEnter,
  onObjectHoverLeave,
  onObjectClick,
  onInteractionStateChange,
  enableInteractions = true,
  enableDebugControls = true,
  debugControlsConfig = {
    showPortalControls: true,
    showCameraControls: true,
  },
}: InteractionSystemProps = {}) {
  const core = useEngineCore();
  const { activeRoom, loopService } = core;
  const interactionService = core.getInteractionService();
  const cameraService = core.getCameraService();

  const { onEnter, onLeave, onClick } = useHandlers();
  const { viewNodes } = useTransitions();
  const interceptablesRef = useRef<Record<string, any>>({});

  // Configurar callbacks personalizados en el InteractionService
  useEffect(() => {
    if (!interactionService || !enableInteractions) return;

    // Configurar callbacks si se proporcionan
    if (onObjectHoverEnter) {
      interactionService.setOnHoverEnter(
        (objectName: string, event: ObjectEventArray) => {
          onObjectHoverEnter(objectName, event);
        }
      );
    }

    if (onObjectHoverLeave) {
      interactionService.setOnHoverLeave(
        (objectName: string, event: ObjectEventArray) => {
          onObjectHoverLeave(objectName, event);
        }
      );
    }

    if (onObjectClick) {
      interactionService.setOnClick(
        (objectName: string, event: ObjectEventArray) => {
          onObjectClick(objectName, event);
        }
      );
    }

    return () => {
      // Limpiar callbacks al desmontar
      interactionService.setOnHoverEnter(undefined);
      interactionService.setOnHoverLeave(undefined);
      interactionService.setOnClick(undefined);
    };
  }, [
    interactionService,
    enableInteractions,
    onObjectHoverEnter,
    onObjectHoverLeave,
    onObjectClick,
    onInteractionStateChange,
  ]);

  // Debug Controls (solo si están habilitados)
  if (enableDebugControls && debugControlsConfig.showPortalControls) {
    //debugging
    useControls("Portal", {
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
    });
  }

  // Cargar lookAtables de forma sincrona
  const lookAtables = useMemo(() => {
    if (!activeRoom) return {};
    return activeRoom?.getLookAtableObjectsSync();
  }, [activeRoom?.getScene()]);

  // Creamos las opciones para el select
  const options = useMemo(() => Object.keys(lookAtables), [lookAtables]);

  console.log(options);

  // Control con dropdown
  const { target } = useControls("Camera", {
    target: {
      value: "scene",
      options: ["scene", ...options],
      label: "Focus Target",
    },
  });

  // Efecto: cuando cambia el target seleccionado
  useEffect(() => {
    if (!target || !cameraService) return;
    const objPos = activeRoom
      ?.getObjectByName(target)
      ?.getWorldPosition(new THREE.Vector3());
    const from = lookAtables[target];
    console.log("Moving camera to:", target, objPos, "from:", from);
    if (from && objPos) {
      cameraService.setLookAt(from, objPos, true);
    }
  }, [target, cameraService, lookAtables, activeRoom?.getScene()]);

  // cargar objetos interceptables de forma sincrona
  useEffect(() => {
    if (!activeRoom) return;
    interceptablesRef.current = activeRoom.getInteractableObjectsSync();
  }, [activeRoom?.getScene()]);

  // actualizar interacciones en el loop
  useEffect(() => {
    if (!loopService || !interactionService || !activeRoom) return;

    const cb = () =>
      interactionService.update(activeRoom, interceptablesRef.current);

    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, [loopService, interactionService, activeRoom]);

  // listeners de eventos
  useEffect(() => {
    if (!interactionService) return;

    interactionService.on("hoverEnter", onEnter);
    interactionService.on("hoverLeave", onLeave);
    interactionService.on("click", onClick);

    return () => {
      interactionService.off("hoverEnter");
      interactionService.off("hoverLeave");
      interactionService.off("click");
    };
  }, [interactionService, onEnter, onLeave, onClick]);

  return null;
}
