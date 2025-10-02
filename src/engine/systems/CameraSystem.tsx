import * as THREE from "three";
import { useEffect } from "react";
import { useEngineCore } from "@engine/Engine";

export type CameraConfig = {
  minDistance?: number;
  maxDistance?: number;
  position?: THREE.Vector3;
  target?: THREE.Vector3;
  smoothTime?: number;
  maxPolarAngle?: number;
  minPolarAngle?: number;
  maxAzimuthAngle?: number;
  minAzimuthAngle?: number;
  enablePan?: boolean;
  boundaryEnclosesCamera?: boolean;
};

export interface CameraSystemProps {
  config?: CameraConfig;
  onCameraMove?: (position: THREE.Vector3, target: THREE.Vector3) => void;
  onCameraStop?: () => void;
  onZoomChange?: (distance: number) => void;
  enableControls?: boolean;
  autoConfigureForRoom?: boolean;
}

export default function CameraSystem({
  config,
  onCameraMove,
  onCameraStop,
  onZoomChange,
  enableControls = true,
  autoConfigureForRoom = true,
}: CameraSystemProps) {
  const core = useEngineCore();
  const { loopService, activeRoom } = core;
  const cameraService = core.getCameraService();

  // Suscripción al loop para updates
  useEffect(() => {
    if (!loopService || !cameraService || !enableControls) return;

    const cb = (_: unknown, dt: number) => {
      cameraService?.update(dt);
    };

    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, [loopService, cameraService, enableControls]);

  // Configuración de eventos de la cámara
  useEffect(() => {
    if (!cameraService) return;

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
  }, [cameraService, onCameraMove, onCameraStop, onZoomChange]);

  // Configuración automática para la room activa
  useEffect(() => {
    if (!cameraService || !autoConfigureForRoom) return;

    // Configuración por defecto (puede ser sobrescrita por props)
    const defaultConfig: CameraConfig = {
      minDistance: 3,
      maxDistance: 6,
      position: new THREE.Vector3(-3.5, 3, 6),
      target: new THREE.Vector3(0, 1.8, 0),
      smoothTime: 0.5,
      maxPolarAngle: Math.PI / 2,
      minPolarAngle: Math.PI / 3,
      maxAzimuthAngle: 0,
      minAzimuthAngle: -Math.PI / 2.5,
      boundaryEnclosesCamera: true,
      enablePan: false,
    };

    // Fusionar configuración por defecto con props
    const finalConfig = { ...defaultConfig, ...config };

    // Aplicar configuración
    if (
      finalConfig.minDistance !== undefined &&
      finalConfig.maxDistance !== undefined
    ) {
      cameraService.setMinMaxDistance(
        finalConfig.minDistance,
        finalConfig.maxDistance
      );
    }

    if (finalConfig.position && finalConfig.target) {
      cameraService.setLookAt(finalConfig.position, finalConfig.target, true);
    }

    if (finalConfig.smoothTime !== undefined) {
      cameraService.setSmoothTime(finalConfig.smoothTime);
    }

    if (finalConfig.maxPolarAngle !== undefined) {
      cameraService.setMaxPolarAngle(finalConfig.maxPolarAngle);
    }

    if (finalConfig.minPolarAngle !== undefined) {
      cameraService.setMinPolarAngle(finalConfig.minPolarAngle);
    }

    if (finalConfig.maxAzimuthAngle !== undefined) {
      cameraService.setAximuthMaxAngle(finalConfig.maxAzimuthAngle);
    }

    if (finalConfig.minAzimuthAngle !== undefined) {
      cameraService.setAzimuthMinAngle(finalConfig.minAzimuthAngle);
    }

    if (finalConfig.boundaryEnclosesCamera !== undefined) {
      cameraService.setBoundaryEnclosesCamera(
        finalConfig.boundaryEnclosesCamera
      );
    }

    if (finalConfig.enablePan !== undefined) {
      cameraService.setEnablePan(finalConfig.enablePan);
    }
  }, [cameraService, activeRoom, config, autoConfigureForRoom]);

  return null;
}
