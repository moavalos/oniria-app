import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { EngineSettings } from "@engine/types/engine.types";
import { Room } from "./entities/Room";
import { Skin } from "./entities/Skin";
import {
  AnimationService,
  CameraService,
  InteractionService,
  LoopService,
  MaterialService,
} from "@/engine/core";

type EngineCoreAPI = {
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  gl: THREE.WebGLRenderer | null;
  activeRoom: Room | null;
  activeSkin: Skin | null;
  unregisterService: (name: string) => void;
  registerService: (name: string, service: unknown) => void;
  registerRoom: (roomId: string, skinId: string) => Promise<void>;
  registerSkin: (skinId: string) => void;
  getAnimationService: () => AnimationService;
  getCameraService: () => CameraService;
  getLoopService: () => LoopService;
  getInteractionService: () => InteractionService;
  getMaterialService: () => MaterialService;
};

export const EngineCoreContext = createContext<EngineCoreAPI | null>(null);

interface EngineCanvasProps extends PropsWithChildren {
  engineSettings: EngineSettings;
  className?: string;
}

//Engine.Canvas
export function EngineCanvas({
  engineSettings = {
    backgroundColor: "#000000",
  },
  children,
  className,
}: EngineCanvasProps) {
  return (
    <Canvas
      className={`canvas-webgl ${className}`}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.NoToneMapping,
      }}
      camera={{
        fov: 45,
        position: [-5, 4, 4],
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
      <color attach="background" args={[engineSettings.backgroundColor]} />
    </Canvas>
  );
}

EngineCanvas.displayName = "Engine.Canvas";

//Engine.Core

interface EngineCoreProps extends PropsWithChildren {}

export function EngineCore({ children }: EngineCoreProps) {
  const [services, setServices] = useState<Record<string, unknown>>({});
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [activeSkin, setActiveSkin] = useState<Skin | null>(null);
  const { scene, camera, gl } = useThree();

  const registerService = (name: string, service: unknown) => {
    setServices((prev) => ({ ...prev, [name]: service }));
  };

  const unregisterService = (name: string) => {
    setServices((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  // Registro de Room y Skin
  const registerRoom = async (
    roomId: string,
    skinId: string
  ): Promise<void> => {
    try {
      if (!roomId?.trim()) {
        throw new Error("Room ID cannot be empty");
      }
      if (!skinId?.trim()) {
        throw new Error("Skin ID cannot be empty");
      }

      // Crear skin
      const skin = new Skin(skinId);
      setActiveSkin(skin);

      // Crear room con configuración precargada
      const room = await Room.create(roomId, skin);
      setActiveRoom(room);

      console.log(
        `Room '${roomId}' and Skin '${skinId}' registered successfully`
      );
    } catch (error) {
      console.error("Failed to register room:", error);
      setActiveRoom(null);
      setActiveSkin(null);
      throw error;
    }
  };

  const registerSkin = (skinId: string): void => {
    try {
      if (!skinId?.trim()) {
        throw new Error("Skin ID cannot be empty");
      }

      const skin = new Skin(skinId);
      setActiveSkin(skin);

      // Si hay una room activa, actualizar su skin
      if (activeRoom) {
        activeRoom.setSkin(skin);
      }

      console.log(`Skin '${skinId}' registered successfully`);
    } catch (error) {
      console.error("Failed to register skin:", error);
      throw error;
    }
  };

  // Factories internas 👇
  const getAnimationService = () => {
    if (!services["animationService"]) {
      if (!scene) throw new Error("Scene no inicializada");
      const service = new AnimationService(scene as any);
      registerService("animationService", service);
      return service;
    }
    return services["animationService"] as AnimationService;
  };

  const getCameraService = () => {
    if (!services["cameraService"]) {
      if (!camera || !gl) throw new Error("Camera/GL no inicializados");
      const service = new CameraService(camera as any, gl.domElement);
      registerService("cameraService", service);
      return service;
    }
    return services["cameraService"] as CameraService;
  };

  const getLoopService = () => {
    if (!services["loopService"]) {
      const service = new LoopService();
      registerService("loopService", service);
      return service;
    }
    return services["loopService"] as LoopService;
  };

  const getInteractionService = () => {
    if (!services["interactionService"]) {
      if (!camera || !gl) throw new Error("Scene/Camera/GL no inicializados");
      const service = new InteractionService(
        camera as THREE.Camera,
        gl.domElement
      );
      registerService("interactionService", service);
      return service;
    }
    return services["interactionService"] as InteractionService;
  };

  const getMaterialService = () => {
    if (!services["materialService"]) {
      const service = new MaterialService();
      registerService("materialService", service);
      return service;
    }
    return services["materialService"] as MaterialService;
  };

  const value = useMemo(
    () => ({
      scene,
      camera,
      gl,
      activeRoom,
      activeSkin,
      unregisterService,
      registerService,
      registerRoom,
      registerSkin,
      getAnimationService,
      getCameraService,
      getLoopService,
      getInteractionService,
      getMaterialService,
    }),
    [scene, camera, gl, activeRoom, activeSkin]
  );

  return (
    <EngineCoreContext.Provider value={value}>
      {children}
    </EngineCoreContext.Provider>
  );
}

export function useEngineCore() {
  const ctx = useContext(EngineCoreContext);
  if (!ctx)
    throw new Error("useEngineCore debe usarse dentro de EngineCoreProvider");
  return ctx;
}

EngineCore.displayName = "Engine.Core";

type EngineNamespace = {
  Canvas: typeof EngineCanvas;
  Core: typeof EngineCore;
};

export const Engine: EngineNamespace = {
  Canvas: EngineCanvas,
  Core: EngineCore,
};
