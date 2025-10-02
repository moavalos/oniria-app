import { CameraSystem, type CameraConfig } from "../systems";
import * as THREE from "three";

// Ejemplo de uso del CameraSystem configurable desde la UI
export function CameraExample() {
  // Configuración personalizada de la cámara
  const cameraConfig: CameraConfig = {
    minDistance: 2,
    maxDistance: 20,
    position: new THREE.Vector3(10, 10, 10),
    target: new THREE.Vector3(0, 0, 0),
    smoothTime: 0.25,
    enablePan: true,
    boundaryEnclosesCamera: false,
  };

  // Handlers para eventos de la cámara
  const handleCameraMove = (position: THREE.Vector3, target: THREE.Vector3) => {
    console.log("Camera moved to:", position, "looking at:", target);
  };

  const handleCameraStop = () => {
    console.log("Camera stopped moving");
  };

  const handleZoomChange = (distance: number) => {
    console.log("Camera distance changed to:", distance);
  };

  return (
    <CameraSystem
      config={cameraConfig}
      onCameraMove={handleCameraMove}
      onCameraStop={handleCameraStop}
      onZoomChange={handleZoomChange}
      enableControls={true}
      autoConfigureForRoom={false}
    />
  );
}

export default CameraExample;
