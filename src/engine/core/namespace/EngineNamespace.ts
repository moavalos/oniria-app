import { EngineCoreProvider } from "../components/EngineCore";
import { EngineCanvas } from "../components/EngineCanvas";

/**
 * Interfaz que define la estructura del namespace Engine
 */
export interface EngineNamespace {
    Core: typeof EngineCoreProvider;
    Canvas: typeof EngineCanvas;
}

/**
 * Namespace que agrupa los componentes principales del motor bajo una API unificada
 */
export const Engine: EngineNamespace = {
    Core: EngineCoreProvider,
    Canvas: EngineCanvas,
};