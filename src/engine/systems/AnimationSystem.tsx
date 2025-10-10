import { useEffect, useState } from "react";

import type { AnimationAction } from "../config/room.type";
import { useEngineCore } from "@engine/core";
import { useRoomVersion } from "../hooks";
import { EngineState } from "@engine/core";

export type AnimationConfig = {
  animations?: Record<string, AnimationAction>;
  autoPlay?: boolean;
  playOnMount?: boolean;
};

export interface AnimationSystemProps {
  config?: AnimationConfig;
  onAnimationStart?: (targetName: string, animationType: string) => void;
  onAnimationComplete?: (targetName: string, animationType: string) => void;
  onAnimationUpdate?: (targetName: string, progress: number) => void;
  enableAnimations?: boolean;
  autoConfigureForRoom?: boolean;
}

/**
 * Sistema de animaciones del motor 3D.
 * Gestiona la reproducción automática y manual de animaciones en objetos de la escena.
 */
export default function AnimationSystem({
  config = {},
  onAnimationStart,
  onAnimationComplete,
  onAnimationUpdate,
  enableAnimations = true,
  autoConfigureForRoom = true,
}: AnimationSystemProps) {
  const core = useEngineCore();
  const { activeRoom, engineState } = core;
  const roomVersion = useRoomVersion(activeRoom);
  const activeScene = activeRoom?.getScene();
  const animationService = core.getAnimationService();

  const [animatables, setAnimatables] = useState<
    Record<string, AnimationAction>
  >({});

  // Solo funcionar cuando el engine esté listo
  const isEngineReady = engineState === EngineState.READY;

  // Configurar objetos animatables desde la habitación o props
  useEffect(() => {
    if (!isEngineReady || !enableAnimations) return;

    const loadAnimatables = async () => {
      let newAnimatables: Record<string, AnimationAction> = {};

      // Cargar animatables desde la room si está configurado
      if (autoConfigureForRoom && activeRoom) {
        const roomAnimatables = await activeRoom.getAnimatableObjects();
        newAnimatables = { ...roomAnimatables };
      }

      // Agregar/sobrescribir con animaciones de configuración
      if (config.animations) {
        newAnimatables = { ...newAnimatables, ...config.animations };
      }

      setAnimatables(newAnimatables);
    };

    loadAnimatables();
  }, [
    roomVersion,
    activeScene,
    config.animations,
    autoConfigureForRoom,
    enableAnimations,
    isEngineReady,
    activeRoom,
  ]);

  // Configurar callbacks de eventos en el servicio
  useEffect(() => {
    if (!isEngineReady || !animationService) return;

    animationService.setOnAnimationStart(onAnimationStart);
    animationService.setOnAnimationComplete(onAnimationComplete);
    animationService.setOnAnimationUpdate(onAnimationUpdate);

    return () => {
      animationService.setOnAnimationStart(undefined);
      animationService.setOnAnimationComplete(undefined);
      animationService.setOnAnimationUpdate(undefined);
    };
  }, [
    animationService,
    onAnimationStart,
    onAnimationComplete,
    onAnimationUpdate,
    isEngineReady,
  ]);

  // Ejecutar animaciones automáticas
  useEffect(() => {
    if (
      !isEngineReady ||
      !animationService ||
      !activeScene ||
      !enableAnimations
    )
      return;

    const shouldAutoPlay =
      config.autoPlay !== false && config.playOnMount !== false;

    if (shouldAutoPlay && Object.keys(animatables).length > 0) {
      Object.values(animatables).forEach((animationConfig) => {
        animationService.play(animationConfig);
      });
    }

    return () => {
      animationService.stopAll();
    };
  }, [
    animationService,
    animatables,
    roomVersion,
    activeScene,
    enableAnimations,
    config.autoPlay,
    config.playOnMount,
    isEngineReady,
  ]);

  return null;
}
