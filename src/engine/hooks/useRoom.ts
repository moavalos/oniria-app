import { useState, useEffect } from 'react';
import { Room } from '../entities/Room';
import { Skin } from '../entities/Skin';
import { ConfigManager } from '../utils/ConfigManager';

interface UseRoomParams {
    roomId: string | null;
    skinId: string | null;
}

interface UseRoomResult {
    room: Room | null;
    loading: boolean;
    error: string | null;
}

/**
 * Hook personalizado para cargar Room con configuración
 * Maneja estado de carga y errores automáticamente
 */
export function useRoom({ roomId, skinId }: UseRoomParams): UseRoomResult {
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!roomId || !skinId) {
            setRoom(null);
            setLoading(false);
            setError(null);
            return;
        }

        let cancelled = false;

        const loadRoom = async () => {
            try {
                setLoading(true);
                setError(null);

                const skin = new Skin(skinId);

                // Opción 1: Usar Factory Pattern directo
                const newRoom = await Room.create(roomId, skin);

                // Opción 2: Usar ConfigManager (mejor para múltiples rooms)
                // const configManager = ConfigManager.getInstance();
                // const config = await configManager.getConfig(roomId);
                // const newRoom = Room.createWithConfig(roomId, skin, config);

                if (!cancelled) {
                    setRoom(newRoom);
                }
            } catch (err) {
                if (!cancelled) {
                    const errorMessage = err instanceof Error ? err.message : 'Failed to load room';
                    setError(errorMessage);
                    setRoom(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadRoom();

        return () => {
            cancelled = true;
        };
    }, [roomId, skinId]);

    return { room, loading, error };
}