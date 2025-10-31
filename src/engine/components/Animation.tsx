import { useEffect } from "react";

import { useEngineCore } from "@engine/core";
import { EngineState } from "@engine/core";
import { useEngineState } from "@/engine/core/hooks/useEngineState";
import {
  AnimationSystem,
  type AnimationConfig,
} from "@engine/systems/AnimationSystem";

export interface AnimationProps {
  config?: AnimationConfig;
  onAnimationStart?: (_targetName: string, _animationType: string) => void;
  onAnimationComplete?: (_targetName: string, _animationType: string) => void;
  onAnimationUpdate?: (_targetName: string, _progress: number) => void;
  enableAnimations?: boolean;
  autoConfigureForRoom?: boolean;
}

/**
 * Componente de sistema de animaciones del motor 3D.
 * Registra la clase AnimationSystem en el core y gestiona los callbacks de UI.
 *
 * @param config Configuración inicial de animaciones
 * @param onAnimationStart Callback cuando inicia una animación
 * @param onAnimationComplete Callback cuando termina una animación
 * @param onAnimationUpdate Callback de progreso de animación
 * @param enableAnimations Habilita o deshabilita las animaciones
 * @param autoConfigureForRoom Si es true, configura automáticamente para la sala activa
 * @returns Componente React que no renderiza nada pero gestiona las animaciones
 */
export function Animation({
  config = {},
  onAnimationStart,
  onAnimationComplete,
  onAnimationUpdate,
  enableAnimations = true,
  autoConfigureForRoom = true,
}: AnimationProps) {
  const core = useEngineCore();
  // const nodeAnimation = useNodeAnimation();

  // Usar el hook que se suscribe reactivamente a cambios de estado
  const engineState = useEngineState();
  const isEngineReady = engineState === EngineState.READY;

  // Registrar el AnimationSystem en el core
  useEffect(() => {
    if (!isEngineReady) {
      console.log(
        "[Animation] ⏳ Esperando que el engine esté listo... Estado actual:",
        engineState
      );
      return;
    }

    console.log("[Animation] ✅ Engine listo, registrando AnimationSystem...");

    // Configuración por defecto
    const defaultConfig: AnimationConfig = {
      autoPlay: true,
      playOnMount: true,
      animations: {},
    };

    // Fusionar configuración por defecto con props
    const finalConfig = autoConfigureForRoom
      ? { ...defaultConfig, ...config }
      : config;

    console.log("[Animation] 🔧 Configuración final que se aplicará:", {
      defaultConfig: defaultConfig,
      userConfig: config,
      finalConfig: finalConfig,
      autoConfigureForRoom: autoConfigureForRoom,
    });

    // Crear e instanciar el sistema de animaciones
    const animationSystem = new AnimationSystem(finalConfig);

    // Configurar el sistema con las opciones recibidas
    animationSystem.setAnimationsEnabled(enableAnimations);
    animationSystem.setAutoConfigureForRoom(autoConfigureForRoom);

    // Configurar callbacks
    animationSystem.setCallbacks(
      onAnimationStart,
      onAnimationComplete,
      onAnimationUpdate
    );

    // Registrar el sistema en el core
    core.addSystem(animationSystem);

    console.log("[Animation] 🎬 AnimationSystem registrado en el core");

    // Cleanup al desmontar - disponer el sistema
    return () => {
      animationSystem.dispose();
      console.log("[Animation] 🗑️ AnimationSystem removido del core");
    };
  }, [
    core,
    // config, // Removido temporalmente para evitar reinicializaciones
    enableAnimations,
    autoConfigureForRoom,
    isEngineReady,
    // onAnimationStart, // Removido: las funciones causan reinicializaciones innecesarias
    // onAnimationComplete, // Removido: las funciones causan reinicializaciones innecesarias
    // onAnimationUpdate, // Removido: las funciones causan reinicializaciones innecesarias
  ]);

  return null;
}
