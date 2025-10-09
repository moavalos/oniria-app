import { EngineCore } from "../Engine";
import { EngineCanvas } from "../Engine";

// Namespace para agrupar los componentes del Engine
export interface EngineNamespace {
    Core: typeof EngineCore;
    Canvas: typeof EngineCanvas;
}

export const Engine: EngineNamespace = {
    Core: EngineCore,
    Canvas: EngineCanvas,
};