import { useEffect, useState } from "react";
import type { AnimationAction } from "../config/room.type";
import { useEngineCore } from "@engine/Engine";
import { useRoomVersion } from "../hooks";

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

export default function AnimationSystem({
  config = {},
  onAnimationStart,
  onAnimationComplete,
  onAnimationUpdate,
  enableAnimations = true,
  autoConfigureForRoom = true,
}: AnimationSystemProps) {
  const core = useEngineCore();
  const { activeRoom } = core;
  const roomVersion = useRoomVersion(activeRoom); // Detectar cambios en el room
  const activeScene = activeRoom?.getScene();
  const animationService = core.getAnimationService();

  // Estado local para objetos animatables
  const [animatables, setAnimatables] = useState<
    Record<string, AnimationAction>
  >({});

  // Configurar objetos animatables desde la habitación o props
  useEffect(() => {
    if (!enableAnimations) return;

    console.log(
      "🎬 AnimationSystem: Detectando cambios - roomVersion:",
      roomVersion,
      "activeScene:",
      !!activeScene
    );

    const loadAnimatables = async () => {
      let newAnimatables: Record<string, AnimationAction> = {};

      // Si autoConfigureForRoom está habilitado, cargar desde la habitación
      if (autoConfigureForRoom && activeRoom) {
        console.log(
          "🎬 AnimationSystem: Cargando animatables desde room:",
          activeRoom.id
        );
        const roomAnimatables = await activeRoom.getAnimatableObjects();
        newAnimatables = { ...roomAnimatables };
        console.log(
          "🎬 AnimationSystem: Animatables encontrados:",
          Object.keys(roomAnimatables)
        );
      }

      // Sobrescribir/agregar con las animaciones de config
      if (config.animations) {
        newAnimatables = { ...newAnimatables, ...config.animations };
      }

      setAnimatables(newAnimatables);
    };

    loadAnimatables();
  }, [
    roomVersion, // Reaccionar a cambios en el room (scene, texturas, etc.)
    activeScene,
    config.animations,
    autoConfigureForRoom,
    enableAnimations,
  ]);

  // Configurar callbacks de eventos en el servicio
  useEffect(() => {
    if (!animationService) return;

    // Configurar callbacks del servicio
    if (onAnimationStart) {
      animationService.setOnAnimationStart(onAnimationStart);
    }
    if (onAnimationComplete) {
      animationService.setOnAnimationComplete(onAnimationComplete);
    }
    if (onAnimationUpdate) {
      animationService.setOnAnimationUpdate(onAnimationUpdate);
    }

    return () => {
      // Limpiar callbacks
      animationService.setOnAnimationStart(undefined);
      animationService.setOnAnimationComplete(undefined);
      animationService.setOnAnimationUpdate(undefined);
    };
  }, [
    animationService,
    onAnimationStart,
    onAnimationComplete,
    onAnimationUpdate,
  ]);

  // Ejecutar animaciones
  useEffect(() => {
    if (!animationService || !activeRoom?.getScene() || !enableAnimations)
      return;

    // Reproducir animaciones automáticamente o según configuración
    const shouldAutoPlay =
      config.autoPlay !== false && config.playOnMount !== false;

    if (shouldAutoPlay) {
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
    roomVersion, // También reaccionar a cambios del room aquí
    activeScene,
    enableAnimations,
    config.autoPlay,
    config.playOnMount,
  ]);

  return null;
}
