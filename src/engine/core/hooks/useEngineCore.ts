import { useContext } from "react";

import { EngineCoreContext, RoomVersionContext } from "../context/EngineContext";

/**
 * Hook para acceder a la API completa del núcleo del motor
 * 
 * @returns API del núcleo del motor con servicios, entidades y métodos principales
 */
export function useEngineCore() {
    const context = useContext(EngineCoreContext);
    if (!context) {
        throw new Error(
            "useEngineCore debe ser usado dentro de un EngineCore provider"
        );
    }
    return context;
}

/**
 * Hook para acceder a la versión actual de la sala
 * 
 * @returns Número de versión de la sala activa
 */
export function useRoomVersionFromEngine() {
    return useContext(RoomVersionContext);
}