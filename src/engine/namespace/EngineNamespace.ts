import { EngineCore } from "@engine/core/components/EngineCore";
import { EngineCanvas } from "@engine/core/components/EngineCanvas";

/**
 * Namespace para agrupar los componentes del Engine.
 * Proporciona acceso tipado a los componentes principales del motor.
 */
export interface EngineNamespace {
    Core: typeof EngineCore;
    Canvas: typeof EngineCanvas;
}

export const Engine: EngineNamespace = {
    Core: EngineCore,
    Canvas: EngineCanvas,
};