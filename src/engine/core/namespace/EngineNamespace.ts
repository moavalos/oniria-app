import { EngineCore } from "../components/EngineCore";
import { EngineCanvas } from "../components/EngineCanvas";

// Namespace para agrupar los componentes del Engine
export interface EngineNamespace {
    Core: typeof EngineCore;
    Canvas: typeof EngineCanvas;
}

export const Engine: EngineNamespace = {
    Core: EngineCore,
    Canvas: EngineCanvas,
};