import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import type { EngineSettings } from "@engine/types/engine.types";
import LoaderSystem from "./systems/LoaderSystem";
import { SceneProvider } from "./context/SceneProvider";
import { EngineCoreProvider } from "./context/EngineCoreProvider";
import type { PropsWithChildren } from "react";

interface EngineProps extends PropsWithChildren {
  engineSettings: EngineSettings;
}

export default function Engine({
  engineSettings = {
    backgroundColor: "#000000",
  },
  children,
}: EngineProps) {
  return (
    <EngineCoreProvider>
      <LoaderSystem />
      <Canvas
        className="canvas-webgl"
        gl={{
          outputColorSpace: THREE.SRGBColorSpace, // Importante
          toneMapping: THREE.NoToneMapping, // Para ver el bake 1:1]
        }}
        camera={{
          fov: 45,
          position: [-5, 4, 4],
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <SceneProvider>{children}</SceneProvider>

        <color attach="background" args={[engineSettings.backgroundColor]} />
      </Canvas>
    </EngineCoreProvider>
  );
}
