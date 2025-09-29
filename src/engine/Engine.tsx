import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import type { EngineSettings } from "@engine/types/engine.types";
import EngineProvider from "@/engine/context/EngineProvider";
import SceneManager from "./systems/SceneManager";
import LoaderSystem from "./systems/LoaderSystem";

interface EngineProps {
  settings: EngineSettings;
}

export default function Engine({ settings }: EngineProps) {
  return (
    <>
      <LoaderSystem />
      <Canvas
        className="canvas-webgl"
        gl={{
          outputColorSpace: THREE.SRGBColorSpace, // Importante
          toneMapping: THREE.NoToneMapping, // Para ver el bake 1:1]
        }}
        camera={{ fov: 45, position: [-5, 2, 4] }}
      >
        <EngineProvider settings={settings}>
          <SceneManager />
        </EngineProvider>
      </Canvas>
    </>
  );
}
