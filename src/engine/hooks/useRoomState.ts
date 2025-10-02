import { useEffect, useState, useCallback } from 'react';
import { useEngineCore } from '../Engine';
import type { ProcessedRoomObjects } from '../utils/ConfigManager';

/**
 * Hook personalizado para manejar el estado de Room en el contexto del Engine
 * Usa el nuevo sistema con ConfigManager y registerRoom del EngineCore
 */
export function useRoomState() {
    const core = useEngineCore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [roomObjects, setRoomObjects] = useState<ProcessedRoomObjects | null>(null);

    // Método para registrar una nueva room
    const registerRoom = useCallback(async (roomId: string, skinId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            setRoomObjects(null);

            // Registrar en el core (esto maneja ConfigManager internamente)
            await core.registerRoom(roomId, skinId);

            // Si hay room activa, obtener sus objetos procesados
            if (core.activeRoom) {
                const objects = await core.activeRoom.getAllObjects();
                setRoomObjects(objects);
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al registrar room';
            setError(errorMessage);
            console.error('Error en useRoomState:', err);
        } finally {
            setIsLoading(false);
        }
    }, [core]);

    // Método para actualizar objetos cuando la escena cambia
    const updateRoomObjects = useCallback(async () => {
        if (!core.activeRoom) {
            setRoomObjects(null);
            return;
        }

        try {
            const objects = await core.activeRoom.getAllObjects();
            setRoomObjects(objects);
        } catch (err) {
            console.error('Error actualizando objetos de room:', err);
            setError('Error actualizando objetos de room');
        }
    }, [core.activeRoom]);

    // Efecto para limpiar estado cuando no hay room activa
    useEffect(() => {
        if (!core.activeRoom) {
            setRoomObjects(null);
            setError(null);
        }
    }, [core.activeRoom]);

    return {
        // Estado
        activeRoom: core.activeRoom,
        activeSkin: core.activeSkin,
        isLoading,
        error,
        roomObjects,

        // Acciones
        registerRoom,
        updateRoomObjects,
        registerSkin: core.registerSkin,

        // Helpers
        hasRoom: !!core.activeRoom,
        hasTextures: core.activeRoom?.hasTextures() ?? false,
        hasScene: core.activeRoom?.hasScene() ?? false,
    };
}

/**
 * Hook personalizado para acceder a objetos específicos de la room
 */
export function useRoomObjects() {
    const { roomObjects } = useRoomState();

    return {
        lookAtables: roomObjects?.lookAtable ?? {},
        animatables: roomObjects?.animatable ?? {},
        interactables: roomObjects?.interactable ?? {},
        colorables: roomObjects?.colorable ?? {},
        hasObjects: !!roomObjects,

        // Helpers específicos
        getObjectColor: (objectName: string) => roomObjects?.colorable[objectName],
        isObjectAnimatable: (objectName: string) => objectName in (roomObjects?.animatable ?? {}),
        isObjectInteractable: (objectName: string) => objectName in (roomObjects?.interactable ?? {}),
        getLookAtPosition: (objectName: string) => roomObjects?.lookAtable[objectName],
    };
}