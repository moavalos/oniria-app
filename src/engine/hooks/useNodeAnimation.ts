import { useCallback } from 'react';
import { useEngineCore } from '@engine/core';

/**
 * Hook que proporciona métodos para animaciones de nodos
 */
export function useNodeAnimation() {
    const core = useEngineCore();
    const { activeNode } = core;

    /**
     * Animación idle - mueve el nodo suavemente a la derecha
     */
    const idle = useCallback(() => {
        if (!activeNode) {
            console.warn('No hay nodo activo para animar');
            return;
        }

        // TODO: Implementar animación suave hacia la derecha
        console.log('Ejecutando animación idle del nodo');
    }, [activeNode]);

    /**
     * Cambia el estado emocional del nodo (color)
     * @param state - Estado emocional ('tristeza', 'alegria', etc.)
     */
    const setState = useCallback((state: string) => {
        if (!activeNode) {
            console.warn('No hay nodo activo para cambiar estado');
            return;
        }

        // TODO: Implementar cambio suave de color según el estado
        console.log(`Cambiando estado del nodo a: ${state}`);
    }, [activeNode]);

    return {
        idle,
        setState,
    };
}