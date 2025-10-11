import { useEngineAPI } from "../context/EngineApiProvider";

/**
 * Hook para acceder a la API pública del motor
 * 
 * @returns API pública del motor con métodos para configurar salas y skins
 */
export function useEngine() {
    const { setRoom, roomId, skinId, node } = useEngineAPI();

    return { setRoom, roomId, skinId, node };
}
