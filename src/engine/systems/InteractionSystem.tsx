import { useEffect, useState } from "react";
import { useEngineCore } from "../Engine";
import { useHandlers } from "../hooks";
import type { ObjectEventArray } from "../config/room.type";
import { EngineState } from "../types";

export interface InteractionSystemProps {
  // Event callbacks
  onObjectHoverEnter?: (objectName: string, events: ObjectEventArray) => void;
  onObjectHoverLeave?: (objectName: string, events: ObjectEventArray) => void;
  onObjectClick?: (objectName: string, events: ObjectEventArray) => void;
  onInteractionStateChange?: (hoveredObjects: string[]) => void;

  // Configuration
  enableInteractions?: boolean;
}

export default function InteractionSystem({
  onObjectHoverEnter,
  onObjectHoverLeave,
  onObjectClick,
  enableInteractions = true,
}: InteractionSystemProps = {}) {
  const services = useEngineCore();
  const { activeRoom, loopService, engineState } = services;
  const interactionService = services.getInteractionService();
  const { onEnter, onLeave, onClick } = useHandlers();

  // Estado para objetos interceptables
  const [interceptables, setInterceptables] = useState<Record<string, any>>({});

  // Solo funcionar cuando el engine esté listo
  const isEngineReady = engineState === EngineState.READY;

  // Cargar objetos interceptables de forma asíncrona (como AnimationSystem)
  useEffect(() => {
    if (!isEngineReady || !activeRoom) {
      setInterceptables({});
      return;
    }

    const loadInterceptables = async () => {
      try {
        // Usar método async como AnimationSystem
        const roomInterceptables = await activeRoom.getInteractableObjects();
        setInterceptables(roomInterceptables || {});
      } catch (error) {
        console.error("Error cargando objetos interceptables:", error);
        setInterceptables({});
      }
    };

    loadInterceptables();
  }, [activeRoom, isEngineReady]);

  // Configurar callbacks personalizados en el InteractionService
  useEffect(() => {
    if (!isEngineReady || !interactionService || !enableInteractions) return;

    // Configurar callbacks custom si se proporcionan
    if (onObjectHoverEnter) {
      interactionService.setOnHoverEnter(onObjectHoverEnter);
    }
    if (onObjectHoverLeave) {
      interactionService.setOnHoverLeave(onObjectHoverLeave);
    }
    if (onObjectClick) {
      interactionService.setOnClick(onObjectClick);
    }

    return () => {
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
    isEngineReady,
  ]);

  // Configurar listeners de eventos internos
  useEffect(() => {
    if (!isEngineReady || !interactionService) return;

    // Configurar los handlers internos
    interactionService.on("hoverEnter", onEnter);
    interactionService.on("hoverLeave", onLeave);
    interactionService.on("click", onClick);

    return () => {
      interactionService.off("hoverEnter");
      interactionService.off("hoverLeave");
      interactionService.off("click");
    };
  }, [interactionService, onEnter, onLeave, onClick, isEngineReady]);

  // Actualizar interacciones en el loop
  useEffect(() => {
    if (!isEngineReady || !loopService || !interactionService || !activeRoom) {
      return;
    }

    const updateInteractions = () => {
      if (Object.keys(interceptables).length > 0) {
        interactionService.update(activeRoom, interceptables);
      }
    };

    loopService.subscribe(updateInteractions);
    return () => loopService.unsubscribe(updateInteractions);
  }, [
    loopService,
    interactionService,
    activeRoom,
    isEngineReady,
    interceptables,
  ]);

  return null;
}
