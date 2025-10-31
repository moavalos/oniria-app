// engine/core/Injectable.ts
import type { EngineCore } from "./EngineCore";

export interface Injectable {
    /**
     * Método de inicialización llamado automáticamente por el EngineCore
     * al registrar el servicio. Recibe el core como dependencia.
     */
    init(_core: EngineCore): void;
}
