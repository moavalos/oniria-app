import { useContext } from "react";
import { EngineCoreContext } from "../context/EngineContext";

export function useEngineCore() {
    const context = useContext(EngineCoreContext);
    if (!context) {
        throw new Error(
            "useEngineCore debe ser usado dentro de un EngineCore provider"
        );
    }
    return context;
}

export function useRoomVersionFromEngine() {
    const core = useEngineCore();
    return core.activeRoom?.id ? 1 : 0; // Fallback simple mientras no hay versión
}