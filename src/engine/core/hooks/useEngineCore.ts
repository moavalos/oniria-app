import { useContext } from "react";
import { EngineCoreContext, RoomVersionContext } from "../context/EngineContext";

export function useEngineCore() {
    const context = useContext(EngineCoreContext);
    if (!context) {
        throw new Error(
            "useEngineCore debe ser usado dentro de un EngineCore provider"
        );
    }
    return context;
}

// ✅ Hook separado para roomVersion
export function useRoomVersionFromEngine() {
    return useContext(RoomVersionContext);
}