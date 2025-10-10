import { Room } from '../entities/Room';
import { useEngineCore, useRoomVersionFromEngine } from '@engine/core';

/**
 * Hook que detecta cambios en la sala activa usando el sistema centralizado de versiones
 * 
 * @param room - Instancia de la sala para verificar cambios
 * @returns Número de versión de la sala si coincide con la activa, 0 en caso contrario
 */
export function useRoomVersion(room: Room | null) {
    const { activeRoom } = useEngineCore();
    const roomVersion = useRoomVersionFromEngine();

    if (!room || !activeRoom || room.id !== activeRoom.id) {
        return 0;
    }

    return roomVersion;
}