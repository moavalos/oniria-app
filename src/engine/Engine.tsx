import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  type PropsWithChildren,
} from "react";
import type { EngineSettings } from "@engine/types/engine.types";
import { Room } from "./entities/Room";
import { Skin } from "./entities/Skin";
import { Node } from "./entities/Node";
import { EngineState } from "./types/engine.types";
import {
  AnimationService,
  CameraService,
  InteractionService,
  LoopService,
  MaterialService,
} from "@/engine/services";

type EngineCoreAPI = {
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  gl: THREE.WebGLRenderer | null;
  size: { width: number; height: number };
  clock: THREE.Clock;
  activeRoom: Room | null;
  activeSkin: Skin | null;
  activeNode: Node | null;
  loopService: LoopService;
  engineState: EngineState;
  // ✅ Solo necesitamos updateActiveRoom en el contexto
  updateActiveRoom: () => void;
  setEngineState: (state: EngineState) => void;
  unregisterService: (name: string) => void;
  registerService: (name: string, service: unknown) => void;
  registerRoom: (roomId: string, skinId: string) => void;
  registerNode: (
    nodeId: string,
    nodeRef: THREE.Group<THREE.Object3DEventMap>
  ) => void;
  registerSkin: (skinId: string) => void;
  getAnimationService: () => AnimationService;
  getCameraService: () => CameraService;
  getInteractionService: () => InteractionService;
  getMaterialService: () => MaterialService;
};

export const EngineCoreContext = createContext<EngineCoreAPI | null>(null);

// ✅ Contexto separado para roomVersion para evitar re-renders
const RoomVersionContext = createContext<number>(0);

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
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [servicesState, setServicesState] = useState<EngineState>(
    EngineState.INITIALIZING
  );
  // ✅ Estado centralizado para versiones de Room
  const [roomVersion, setRoomVersion] = useState<number>(0);

  const { scene, camera, gl, size, clock } = useThree();

  // LoopService se inicializa inmediatamente y vive durante toda la sesión
  const loopService = useMemo(() => new LoopService(), []);

  // useFrame centralizado para todo el engine
  useFrame((state, delta) => {
    loopService.tick(state, delta);
  });

  // Estado del engine
  const setEngineState = useCallback(
    (state: EngineState) => {
      setServicesState(state);
    },
    [servicesState]
  );

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
      } catch (error) {
        console.error("Failed to register skin:", error);
        throw error;
      }
    },
    [activeRoom]
  );

  // Registro de Node
  const registerNode = useCallback(
    (nodeId: string, nodeRef: THREE.Group<THREE.Object3DEventMap>): void => {
      try {
        if (!nodeId?.trim()) {
          throw new Error("Node ID cannot be empty");
        }
        if (!nodeRef) {
          throw new Error("Node ref cannot be null");
        }

        // Crear o actualizar el nodo activo
        let node = activeNode;
        if (!node || node.id !== nodeId) {
          node = new Node(nodeId);
          setActiveNode(node);
        }

        // Establecer la referencia del grupo
        node.setGroup(nodeRef);
      } catch (error) {
        console.error("Failed to register node:", error);
        setActiveNode(null);
        throw error;
      }
    },
    [activeNode]
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

  // ✅ Método para actualizar versión de Room desde eventos
  const updateActiveRoom = useCallback(() => {
    setRoomVersion((prev) => prev + 1);
  }, []); // Sin dependencias para evitar loops

  // ✅ Configurar listeners de eventos de Room cuando activeRoom cambia
  useEffect(() => {
    if (activeRoom) {
      // Escuchar todos los eventos de cambio de Room
      const handleRoomChange = () => {
        updateActiveRoom();
      };

      activeRoom.on("change", handleRoomChange);

      // Cleanup al desmontarse o cambiar de room
      return () => {
        activeRoom.off("change");
      };
    }
  }, [activeRoom, updateActiveRoom]); // Solo depende de activeRoom

  const value = useMemo(
    () => ({
      scene,
      camera,
      gl,
      size,
      clock,
      activeRoom,
      activeSkin,
      activeNode,
      loopService,
      engineState: servicesState,
      // ✅ Solo updateActiveRoom, sin roomVersion para evitar re-renders
      updateActiveRoom,
      setEngineState,
      unregisterService,
      registerService,
      registerRoom,
      registerSkin,
      registerNode,
      getAnimationService,
      getCameraService,
      getInteractionService,
      getMaterialService,
    }),
    [
      scene,
      camera,
      gl,
      size,
      clock,
      activeRoom,
      activeSkin,
      activeNode,
      loopService,
      servicesState,
      // ✅ Sin roomVersion para evitar re-renders constantes
      updateActiveRoom,
      setEngineState,
      unregisterService,
      registerService,
      registerRoom,
      registerSkin,
      registerNode,
      getAnimationService,
      getCameraService,
      getInteractionService,
      getMaterialService,
    ]
  );

  return (
    <RoomVersionContext.Provider value={roomVersion}>
      <EngineCoreContext.Provider value={value}>
        {children}
      </EngineCoreContext.Provider>
    </RoomVersionContext.Provider>
  );
}

export function useEngineCore() {
  const ctx = useContext(EngineCoreContext);
  if (!ctx)
    throw new Error("useEngineCore debe usarse dentro de EngineCoreProvider");
  return ctx;
}

// ✅ Hook separado para roomVersion
export function useRoomVersionFromEngine() {
  return useContext(RoomVersionContext);
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
