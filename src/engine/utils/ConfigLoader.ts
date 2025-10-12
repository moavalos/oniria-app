import type { RoomConfig } from "../config/room.type";

/**
 * Carga la configuración de una sala específica.
 * @param name - Nombre de la sala a cargar
 * @returns Configuración de la sala
 */
export async function loadRoomConfig(name: string): Promise<RoomConfig> {
    const config: RoomConfig = (await import(`../config/rooms/${name}.json`)).default;
    return config;
}
