// engine/core/BaseSystem.ts
import { EventEmitter } from "@engine/utils/EventEmitter";
import { EngineCore } from "./EngineCore.class";
import { type ISystem } from "./ISystem";

/**
 * Clase base para todos los sistemas del motor.
 * Provee ciclo de vida, activación, eventos y acceso al EngineCore.
 */
export abstract class BaseSystem extends EventEmitter implements ISystem {
    /** Nombre identificador del sistema */
    abstract name: string;

    /** Referencia al engine principal */
    protected core!: EngineCore;

    /** Si el sistema está activo */
    protected active = true;

    /** Si ya fue inicializado */
    protected initialized = false;

    // --- Ciclo de vida --- //

    init(core: EngineCore): void {
        this.core = core;
        this.initialized = true;
        this.log(`✅ Initialized`);
    }

    /** Método abstracto que debe implementar cada sistema */
    abstract update(_dt: number): void;

    dispose(): void {
        this.active = false;
        this.initialized = false;
        this.removeAllListeners();
        this.log(`🧹 Disposed`);
    }

    // --- Utilidades --- //

    /** Activa o desactiva el sistema */
    setActive(value: boolean): void {
        this.active = value;
        this.log(value ? "▶️ Activated" : "⏸️ Deactivated");
    }

    /** Devuelve si el sistema está activo */
    isActive(): boolean {
        return this.active;
    }

    /** Log contextual */
    protected log(...args: any[]) {
        console.log(`[${this.name}]`, ...args);
    }
}
