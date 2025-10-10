import { useEngineStore } from "@engine/core/store/engineStore";

/**
 * Hook personalizado para monitorear el progreso de carga de assets del motor
 * 
 * Este hook reemplaza al useProgress de @react-three/drei para tener mayor control
 * y personalización específica para nuestras necesidades.
 * 
 * @returns Estado completo del progreso de carga
 * @property {boolean} active - Si hay una carga activa en progreso
 * @property {number} progress - Progreso de carga de 0 a 100
 * @property {string[]} errors - Array de errores durante la carga
 * @property {LoadingItem[]} items - Items individuales siendo cargados
 */
export function useProgress() {
    const active = useEngineStore((state) => state.active);
    const progress = useEngineStore((state) => state.progress);
    const errors = useEngineStore((state) => state.errors);
    const items = useEngineStore((state) => state.items);

    return {
        active,
        progress,
        errors,
        items
    };
}

/**
 * Hook para obtener las acciones del loader
 * Útil para componentes que necesitan controlar el estado de carga
 * 
 * Esto es de uso interno del engine principalmente.
 */
export function useLoaderActions() {
    const startLoading = useEngineStore((state) => state.startLoading);
    const finishLoading = useEngineStore((state) => state.finishLoading);
    const setProgress = useEngineStore((state) => state.setProgress);
    const setItems = useEngineStore((state) => state.setItems);
    const updateItem = useEngineStore((state) => state.updateItem);
    const addError = useEngineStore((state) => state.addError);
    const clearErrors = useEngineStore((state) => state.clearErrors);
    const resetLoading = useEngineStore((state) => state.resetLoading);

    return {
        startLoading,
        finishLoading,
        setProgress,
        setItems,
        updateItem,
        addError,
        clearErrors,
        resetLoading
    };
}