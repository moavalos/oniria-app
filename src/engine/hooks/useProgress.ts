import { useEngineStore } from "@engine/store/engineStore";

/**
 * Hook useProgress propio que reemplaza al de Drei
 * 
 * Retorna el mismo formato que useProgress de @react-three/drei
 * pero usando nuestro store de Zustand interno.
 * 
 * @returns {object} Estado del progreso de carga
 * @property {boolean} active - Si hay una carga activa
 * @property {number} progress - Progreso de 0 a 100
 * @property {string[]} errors - Array de errores durante la carga
 * @property {LoadingItem[]} items - Items individuales siendo cargados
 */
export function useProgress() {
  const active = useEngineStore((state) => state.active);
  const progress = useEngineStore((state) => state.progress);
  const errors = useEngineStore((state) => state.errors);
  const items = useEngineStore((state) => state.items);

  console.log("📊 useProgress (propio):", {
    active,
    progress: Math.round(progress),
    errors: errors.length,
    items: items.length
  });

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