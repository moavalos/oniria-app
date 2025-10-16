// ===================================================================
// Engine Module - Punto de entrada principal del Motor 3D
// ===================================================================

// Componentes principales del core
export { DefaultEngineIndicator } from "@engine/core/components/DefaultEngineIndicator";

// Namespace y contexto
export { Engine } from "@engine/core/namespace/EngineNamespace";
export { EngineApiProvider } from "@engine/core/context/EngineApiProvider";

// Store
export { useEngineStore } from "@engine/core/store/engineStore";

// Escenas
export { default as RoomScene } from "./scenes/RoomScene";

// Sistemas
export { default as LoaderSystem, type LoaderSystemProps, type LoaderProps } from "./systems/LoaderSystem";
export { System, Systems } from "./components";  // Exportar ambos para compatibilidad
export { InteractionSystem } from "./systems/InteractionSystem";
export { default as DebugSystem } from "./systems/DebugSystem";

// Tipos principales
export type { EngineNamespace } from "@engine/core/namespace/EngineNamespace";

