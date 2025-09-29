import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import type { EngineSettings, UserSettings } from "@engine/types/engine.types";
import EngineProvider from "@/engine/context/EngineProvider";
import SceneManager from "./systems/SceneManager";
import LoaderSystem from "./systems/LoaderSystem";

interface EngineProps {
  userSettings?: UserSettings;
  engineSettings: EngineSettings;
}

export default function Engine({
  engineSettings = {
    backgroundColor: "#000000",
  },
  userSettings,
}: EngineProps) {
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
        <EngineProvider settings={userSettings ?? undefined}>
          <SceneManager />
        </EngineProvider>

        <color attach="background" args={[engineSettings.backgroundColor]} />
      </Canvas>
    </>
  );
}
