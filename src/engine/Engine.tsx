import { Canvas } from "@react-three/fiber";
import type { engineSettings } from "@engine/types/engine.types";
import EngineProvider from "@engine/providers/EngineProvider";
import RendererSystem from "@engine/systems/RendererSystem";
import LoaderSystem from "@engine/systems/LoaderSystem";
import CameraSystem from "@engine/systems/CameraSystem";

interface EngineProps {
  settings: engineSettings;
}

export default function Engine({ settings }: EngineProps) {
  return (
    <EngineProvider settings={settings}>
      <LoaderSystem />
      <Canvas>
        <CameraSystem />
        <RendererSystem />
      </Canvas>
    </EngineProvider>
  );
}
