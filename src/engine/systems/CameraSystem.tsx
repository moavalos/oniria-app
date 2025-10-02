import * as THREE from "three";
import { useEffect } from "react";
import { useEngineAPI } from "../context/EngineApiProvider";

export default function CameraSystem() {
  const { loopService, cameraService, activeRoom } = useEngineAPI();

  useEffect(() => {
    if (!loopService || !cameraService) return;
    const cb = (_: unknown, dt: number) => {
      cameraService?.update(dt);
    };
    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, [loopService, cameraService]);

  useEffect(() => {
    if (!cameraService) return;
    cameraService.setMinMaxDistance(3, 6);
    cameraService.setLookAt(
      new THREE.Vector3(-3.5, 3, 6),
      new THREE.Vector3(0, 1.8, 0),
      true
    );
    cameraService.setSmoothTime(0.5);
    cameraService.setMaxPolarAngle(Math.PI / 2);
    cameraService.setMinPolarAngle(Math.PI / 3);
    cameraService.setAximuthMaxAngle(0);
    cameraService.setAzimuthMinAngle(-Math.PI / 2.5);
    cameraService.setBoundaryEnclosesCamera(true);
    cameraService.setEnablePan(false);
  }, [cameraService, activeRoom]);

  return null;
}
