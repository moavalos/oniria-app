import { Room } from '../entities/Room';
import { useEngineCore, useRoomVersionFromEngine } from '../Engine';

/**
 * Hook que detecta cambios en el Room activo usando el sistema centralizado de versiones
 * Este hook usa el Engine core para obtener la versión actual del room,
 * que se actualiza automáticamente cuando el Room emite eventos de cambio
 */
export function useRoomVersion(room: Room | null) {
    const { activeRoom } = useEngineCore();
    const roomVersion = useRoomVersionFromEngine();

    // Solo devolver la versión si el room pasado coincide con el activeRoom
    // Si no hay room activo o no coincide, devolver 0
    if (!room || !activeRoom || room.id !== activeRoom.id) {
        return 0;
    }

    return roomVersion;
}