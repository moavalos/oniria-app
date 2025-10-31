// ===================================================================
// Core/index.ts - Exportaciones principales del core del Engine
// ===================================================================

// Componentes principales
export { EngineCanvas } from "./components/EngineCanvas";
//export { EngineCore } from "./components/EngineCore";
export { DefaultEngineIndicator } from "./components/DefaultEngineIndicator";
export { EngineCore } from './src/EngineCore';

// Hooks principales del core
export { useEngineCore } from "./context/EngineCoreContext";
export { useEngineState } from "./hooks/useEngineState";

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

