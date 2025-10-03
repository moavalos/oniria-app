import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
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
  loopService: LoopService;
  unregisterService: (name: string) => void;
  registerService: (name: string, service: unknown) => void;
  registerRoom: (roomId: string, skinId: string) => void;
  registerSkin: (skinId: string) => void;
  getAnimationService: () => AnimationService;
  getCameraService: () => CameraService;
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

  // LoopService se inicializa inmediatamente y vive durante toda la sesión
  const loopService = useMemo(() => new LoopService(), []);

  // useFrame centralizado para todo el engine
  useFrame((state, delta) => {
    loopService.tick(state, delta);
  });

  const registerService = useCallback((name: string, service: unknown) => {
    setServices((prev) => ({ ...prev, [name]: service }));
  }, []);

  const unregisterService = useCallback(
    (name: string) => {
      setServices((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    },
    [services]
  );

  // Registro de Room y Skin
  const registerRoom = useCallback((roomId: string, skinId: string): void => {
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

      // Crear room directamente (la configuración se cargará bajo demanda)
      const room = new Room(roomId, skin);
      setActiveRoom(room);
    } catch (error) {
      console.error("Failed to register room:", error);
      setActiveRoom(null);
      setActiveSkin(null);
      throw error;
    }
  }, []);

  const registerSkin = useCallback(
    (skinId: string): void => {
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
    },
    [activeRoom]
  );

  // Factories internas 👇 - Híbrido: lazy creation pero controlado
  const getAnimationService = useCallback(() => {
    let service = services["animationService"] as AnimationService;
    if (!service) {
      if (!scene) throw new Error("Scene no inicializada");
      service = new AnimationService(scene as any);
      // Usar setTimeout para evitar actualización durante render
      setTimeout(() => {
        registerService("animationService", service);
      }, 0);
      // Retornar el servicio inmediatamente para uso
      return service;
    }
    return service;
  }, [services, scene, registerService]);

  const getCameraService = useCallback(() => {
    let service = services["cameraService"] as CameraService;
    if (!service) {
      if (!camera || !gl) throw new Error("Camera/GL no inicializados");
      service = new CameraService(camera as any, gl.domElement);
      setTimeout(() => {
        registerService("cameraService", service);
      }, 0);
      return service;
    }
    return service;
  }, [services, camera, gl, registerService]);

  const getInteractionService = useCallback(() => {
    let service = services["interactionService"] as InteractionService;
    if (!service) {
      if (!camera || !gl) throw new Error("Scene/Camera/GL no inicializados");
      service = new InteractionService(camera as THREE.Camera, gl.domElement);
      setTimeout(() => {
        registerService("interactionService", service);
      }, 0);
      return service;
    }
    return service;
  }, [services, camera, gl, registerService]);

  const getMaterialService = useCallback(() => {
    let service = services["materialService"] as MaterialService;
    if (!service) {
      service = new MaterialService();
      setTimeout(() => {
        registerService("materialService", service);
      }, 0);
      return service;
    }
    return service;
  }, [services, registerService]);

  const value = useMemo(
    () => ({
      scene,
      camera,
      gl,
      activeRoom,
      activeSkin,
      loopService,
      unregisterService,
      registerService,
      registerRoom,
      registerSkin,
      getAnimationService,
      getCameraService,
      getInteractionService,
      getMaterialService,
    }),
    [
      scene,
      camera,
      gl,
      activeRoom,
      activeSkin,
      loopService,
      unregisterService,
      registerService,
      registerRoom,
      registerSkin,
      getAnimationService,
      getCameraService,
      getInteractionService,
      getMaterialService,
    ]
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
