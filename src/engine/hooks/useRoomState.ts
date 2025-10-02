import { useState, useCallback } from 'react';
import { useEngineCore } from '../Engine.tsx';

/**
 * Hook personalizado para manejar el estado de Room en el contexto del Engine
 * Sistema simplificado que carga configuración bajo demanda
 */
export function useRoomState() {
    const core = useEngineCore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Método para registrar una nueva room
    const registerRoom = useCallback((roomId: string, skinId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            // Registrar en el core (Room se crea inmediatamente)
            core.registerRoom(roomId, skinId);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al registrar room';
            setError(errorMessage);
            console.error('Error en useRoomState:', err);
        } finally {
            setIsLoading(false);
        }
    }, [core]);

    return {
        // Estado
        activeRoom: core.activeRoom,
        activeSkin: core.activeSkin,
        isLoading,
        error,

        // Acciones
        registerRoom,
        registerSkin: core.registerSkin,

        // Helpers
        hasRoom: !!core.activeRoom,
        hasTextures: core.activeRoom?.hasTextures() ?? false,
        hasScene: core.activeRoom?.hasScene() ?? false,
    };
}

/**
 * Hook personalizado para cargar objetos de la room bajo demanda
 */
export function useRoomObjects() {
    const { activeRoom } = useRoomState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Método para cargar objetos cuando sean necesarios
    const loadObjects = useCallback(async () => {
        if (!activeRoom) {
            return null;
        }

        try {
            setIsLoading(true);
            setError(null);
            return await activeRoom.getAllObjects();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al cargar objetos';
            setError(errorMessage);
            console.error('Error en useRoomObjects:', err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [activeRoom]);

    // Métodos específicos para cargar solo cierto tipo de objetos
    const loadLookAtables = useCallback(async () => {
        if (!activeRoom || !activeRoom.hasScene()) return {};
        try {
            return await activeRoom.getLookAtableObjects();
        } catch (err) {
            console.error('Error loading lookAtables:', err);
            return {};
        }
    }, [activeRoom]);

    const loadAnimatables = useCallback(async () => {
        if (!activeRoom) return {};
        try {
            return await activeRoom.getAnimatableObjects();
        } catch (err) {
            console.error('Error loading animatables:', err);
            return {};
        }
    }, [activeRoom]);

    const loadInteractables = useCallback(async () => {
        if (!activeRoom || !activeRoom.hasScene()) return {};
        try {
            return await activeRoom.getInteractableObjects();
        } catch (err) {
            console.error('Error loading interactables:', err);
            return {};
        }
    }, [activeRoom]);

    const loadColorables = useCallback(async () => {
        if (!activeRoom) return {};
        try {
            return await activeRoom.getColorableObjects();
        } catch (err) {
            console.error('Error loading colorables:', err);
            return {};
        }
    }, [activeRoom]);

    return {
        // Estado
        isLoading,
        error,
        hasRoom: !!activeRoom,

        // Métodos de carga bajo demanda
        loadObjects,
        loadLookAtables,
        loadAnimatables,
        loadInteractables,
        loadColorables,
    };
}