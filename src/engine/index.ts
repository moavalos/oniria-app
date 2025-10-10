// ===================================================================
// Engine Module - Punto de entrada principal del Motor 3D
// ===================================================================

// Componente principal wrapper
export { default as Engine } from "./Engine";

// Componentes principales del core
export { EngineCanvas } from "@engine/core/components/EngineCanvas";
export { EngineCore } from "@engine/core/components/EngineCore";

// Hooks principales del core
export {
    useEngineCore,
    useRoomVersionFromEngine,
} from "@engine/core/hooks/useEngineCore";
export { useEngine } from "@engine/core/hooks/useEngine";

// Namespace y contexto
export { Engine as EngineAPI } from "@engine/core/namespace/EngineNamespace";
export { EngineApiProvider } from "@engine/core/context/EngineApiProvider";

// Store
export { useEngineStore } from "@engine/core/store/engineStore";

// Escenas
export { default as RoomScene } from "./scenes/RoomScene";

// Sistemas
export { default as LoaderSystem, type LoaderSystemProps, type LoaderProps } from "./systems/LoaderSystem";
export { default as CameraSystem } from "./systems/CameraSystem";
export { default as AnimationSystem } from "./systems/AnimationSystem";
export { default as InteractionSystem } from "./systems/InteractionSystem";
export { default as DebugSystem } from "./systems/DebugSystem";

// Tipos principales
export type { EngineNamespace } from "@engine/core/namespace/EngineNamespace";
export type { EngineCoreAPI } from "@engine/core/context/EngineContext";

