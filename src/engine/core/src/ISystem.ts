import type { EngineCore } from "./EngineCore";

/**
 * Interfaz base para todos los sistemas del motor.
 * Define el ciclo de vida común.
 */
export interface ISystem {
    /** Se llama al registrar el sistema */
    init(_core: EngineCore): void;

    /** Se llama en cada frame */
    update(_dt: number): void;

    /** Se llama al desmontar o limpiar el sistema */
    dispose(): void;
}