import { Canvas } from "@react-three/fiber";
import type { engineSettings } from "@engine/types/engine.types";
import EngineProvider from "@engine/providers/EngineProvider";
import RendererSystem from "@engine/systems/RendererSystem";
import LoaderSystem from "@engine/systems/LoaderSystem";
import CameraSystem from "@engine/systems/CameraSystem";
import * as THREE from "three";

interface EngineProps {
  settings: engineSettings;
}

export default function Engine({ settings }: EngineProps) {
  return (
    <EngineProvider settings={settings}>
      <LoaderSystem />
      <Canvas
        className="canvas-webgl"
        gl={{
          outputColorSpace: THREE.SRGBColorSpace, // Importante
          toneMapping: THREE.NoToneMapping, // Para ver el bake 1:1]
        }}
        camera={{ fov: 45, position: [-5, 2, 4] }}
      >
        <CameraSystem />
        <RendererSystem />
      </Canvas>
    </EngineProvider>
  );
}
