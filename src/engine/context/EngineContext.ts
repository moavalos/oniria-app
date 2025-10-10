import { createContext } from "react";
import * as THREE from "three";
import type { Room } from "../entities/Room";
import type { Skin } from "../entities/Skin";
import type { Node } from "../entities/Node";
import type { EngineState } from "../types";

// Interfaz para la API del core del Engine
export interface EngineCoreAPI {
    // Estados
    engineState: EngineState;
    setEngineState: (_state: EngineState) => void;

    // Entidades activas
    activeRoom: Room | null;
    activeSkin: Skin | null;
    activeNode: Node | null;

    // Servicios
    services: Record<string, unknown>;

    // Métodos principales
    loadRoom: (_roomId: string, _skinId: string) => Promise<void>;
    setActiveNode: (_nodeId: string, _nodeRef: THREE.Group<THREE.Object3DEventMap>) => void;
    clearActiveNode: () => void;
    changeSkin: (_skinId: string) => Promise<void>;

    // Gestión de servicios
    registerService: (_name: string, _service: unknown) => void;
    getService: <T>(_name: string) => T | null;
    getMaterialService: () => any;
    getCameraService: () => any;
    getAnimationService: () => any;
    getInteractionService: () => any;
    getLoopService: () => any;
}

export const EngineCoreContext = createContext<EngineCoreAPI | null>(null);