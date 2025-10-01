import { createContext, useContext, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useEngineCore } from "./EngineCoreProvider";
import { type EngineAPI } from "../types";
import {
  AnimationService,
  CameraService,
  InteractionService,
  LoopService,
  TargetRegisterService,
} from "../services";

export const EngineSceneContext = createContext<EngineAPI | null>(null);

interface Props extends React.PropsWithChildren {}

export function SceneProvider({ children }: Props) {
  const core = useEngineCore();
  const { scene, camera, gl } = useThree();

  console.log(scene);

  const api = useMemo(() => {
    if (!gl || !camera || !scene) return null;

    return {
      ...core,
      loopService: new LoopService(),
      registerService: new TargetRegisterService(),
      animationService: new AnimationService(scene as any),
      interactionService: new InteractionService(camera, gl.domElement),
      cameraService: new CameraService(camera as any, gl.domElement),
      scene,
      camera,
      gl,
    };
  }, [gl, camera, scene, core]);

  return (
    <EngineSceneContext.Provider value={api}>
      {children}
    </EngineSceneContext.Provider>
  );
}

export function useEngineAPI() {
  const ctx = useContext(EngineSceneContext);
  if (!ctx)
    throw new Error("useEngineAPI debe usarse dentro de EngineSceneProvider");
  return ctx;
}
