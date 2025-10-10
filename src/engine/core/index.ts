// ===================================================================
// Core/index.ts - Exportaciones principales del core del Engine
// ===================================================================

// Componentes principales
export { EngineCanvas } from "./components/EngineCanvas";
export { EngineCore } from "./components/EngineCore";
export { DefaultEngineIndicator } from "./components/DefaultEngineIndicator";

// Hooks principales del core
export { useEngineCore, useRoomVersionFromEngine, useEngine } from "./hooks";

// Contextos
export { EngineCoreContext, RoomVersionContext } from "./context/EngineContext";
export type { EngineCoreAPI } from "./context/EngineContext";

// Entidades principales
export { Room } from "@engine/entities/Room";
export { Skin } from "@engine/entities/Skin";
export { Node } from "@engine/entities/Node";

// Tipos principales
export * from "./types/engine.types";

// Utilidades principales
export { EventEmitter } from "../utils/EventEmitter";
export { loadRoomConfig } from "../utils/ConfigLoader";

// Store
export { useEngineStore } from "./store/engineStore";

// Namespace
export { Engine } from "./namespace/EngineNamespace";
export type { EngineNamespace } from "./namespace/EngineNamespace";

