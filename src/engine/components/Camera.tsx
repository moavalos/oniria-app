import * as THREE from "three";
import { useEffect } from "react";

import { useEngineCore } from "@engine/core";
import { EngineState } from "@engine/core/";
import { useEngineState } from "@/engine/core/hooks/useEngineState";
import { CameraSystem } from "@engine/systems/CameraSystem";
import {
  CameraService,
  type CameraConfig,
} from "@engine/services/CameraService";

export interface CameraProps {
  config?: CameraConfig;
  onCameraMove?: (position: THREE.Vector3, target: THREE.Vector3) => void;
  onCameraStop?: () => void;
  onZoomChange?: (distance: number) => void;
  enableControls?: boolean;
  autoConfigureForRoom?: boolean;
}

/**
 * Componente de sistema de cámara del motor 3D.
 * Registra la clase CameraSystem en el core y gestiona los callbacks de UI.
 *
 * @param config Configuración inicial de la cámara
 * @param onCameraMove Callback cuando la cámara se mueve
 * @param onCameraStop Callback cuando la cámara deja de moverse
 * @param onZoomChange Callback cuando cambia el zoom (distancia)
 * @param enableControls Habilita o deshabilita los controles de la cámara
 * @param autoConfigureForRoom Si es true, configura automáticamente la cámara para la sala activa
 * @returns Componente React que no renderiza nada pero gestiona la cámara
 */
export function Camera({
  config,
  onCameraMove,
  onCameraStop,
  onZoomChange,
  enableControls = true,
  autoConfigureForRoom = true,
}: CameraProps) {
  const core = useEngineCore();
  const cameraService = core.getService(CameraService);

  // Usar el hook que se suscribe reactivamente a cambios de estado
  const engineState = useEngineState();
  const isEngineReady = engineState === EngineState.READY;

  // Registrar el CameraSystem en el core
  useEffect(() => {
    if (!isEngineReady) {
      console.log(
        "[Camera] ⏳ Esperando que el engine esté listo... Estado actual:",
        engineState
      );
      return;
    }

    console.log("[Camera] ✅ Engine listo, registrando CameraSystem...");

    // Configuración por defecto para auto-configuración
    const defaultConfig: CameraConfig = {
      minDistance: 3,
      maxDistance: 6,
      position: new THREE.Vector3(-4, 3, 4),
      target: new THREE.Vector3(0, 1.8, 0),
      smoothTime: 0.5,
      maxPolarAngle: Math.PI / 2,
      minPolarAngle: Math.PI / 3,
      maxAzimuthAngle: 0,
      minAzimuthAngle: -Math.PI / 2.5,
      boundaryEnclosesCamera: true,
      enablePan: false,
    };

    // Fusionar configuración por defecto con props si hay auto-configuración
    const finalConfig = autoConfigureForRoom
      ? { ...defaultConfig, ...config }
      : config;

    console.log("[Camera] 🔧 Configuración final que se aplicará:", {
      defaultConfig: defaultConfig,
      userConfig: config,
      finalConfig: finalConfig,
      autoConfigureForRoom: autoConfigureForRoom,
    });

    // Crear e instanciar el sistema de cámara
    const cameraSystem = new CameraSystem(finalConfig);

    // Configurar el sistema con las opciones recibidas
    cameraSystem.setControlsEnabled(enableControls);
    //cameraSystem.setAutoConfigureForRoom(autoConfigureForRoom);

    // Registrar el sistema en el core
    core.addSystem(cameraSystem);

    console.log("[Camera] 🎥 CameraSystem registrado en el core");

    // Cleanup al desmontar - disponer el sistema
    return () => {
      cameraSystem.dispose();
      console.log("[Camera] 🗑️ CameraSystem removido del core");
    };
  }, [
    core,
    // config, // Removido temporalmente para evitar reinicializaciones
    enableControls,
    autoConfigureForRoom,
    isEngineReady,
    // engineState, // Removido: ya está incluido implícitamente en isEngineReady
  ]);

  // TODO: Integrar con la API del motor cuando esté disponible
  // Registrar acciones viewNodes y viewReset para transiciones

  // Configuración de eventos de la cámara
  useEffect(() => {
    if (!isEngineReady || !cameraService) return;

    const handleCameraMove = () => {
      if (onCameraMove) {
        const position = cameraService.getPosition();
        const target = cameraService.getTarget();
        onCameraMove(position, target);
      }
    };

    const handleCameraControl = () => {
      if (onZoomChange) {
        const distance = cameraService.getDistance();
        onZoomChange(distance);
      }
    };

    const handleCameraStop = () => {
      onCameraStop?.();
    };

    // Agregar event listeners
    cameraService.addEventListener("controlstart", handleCameraMove);
    cameraService.addEventListener("control", handleCameraControl);
    cameraService.addEventListener("controlend", handleCameraStop);

    return () => {
      cameraService.removeEventListener("controlstart", handleCameraMove);
      cameraService.removeEventListener("control", handleCameraControl);
      cameraService.removeEventListener("controlend", handleCameraStop);
    };
  }, [cameraService, isEngineReady]); // Removidas las funciones callback para evitar reinicializaciones

  return null;
}
