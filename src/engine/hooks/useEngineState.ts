import { useEffect, useState } from "react";
import { useEngineCore } from "@engine/core";
import { EngineState } from "@engine/core/";

/**
 * Hook que se suscribe a los cambios de estado del engine
 * Proporciona un estado reactivo del EngineCore
 * 
 * @returns Estado actual del engine que se actualiza automáticamente
 */
export function useEngineState(): EngineState {
    const core = useEngineCore();
    const [engineState, setEngineState] = useState<EngineState>(() =>
        core.getState()
    );

    useEffect(() => {
        // Función que maneja el cambio de estado
        const handleStateChange = (newState: EngineState) => {
            console.log("[useEngineState] Estado del engine cambió:", newState);
            setEngineState(newState);
        };

        // Suscribirse al evento de cambio de estado
        core.on("engine:state", handleStateChange);

        // Obtener el estado inicial por si acaso
        const initialState = core.getState();
        if (initialState !== engineState) {
            setEngineState(initialState);
        }

        // Cleanup - desuscribirse del evento
        return () => {
            core.off("engine:state");
        };
    }, [core, engineState]);

    return engineState;
}

export default useEngineState;