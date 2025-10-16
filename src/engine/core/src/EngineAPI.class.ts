import type { EngineCore } from "./EngineCore.class";

interface PendingRoomRequest {
    roomId: string;
    skinId?: string;
}

export class EngineAPI {
    private _core: EngineCore | null = null;

    private _pendingRoomRequest: PendingRoomRequest | null = null;

    attachCore(core: EngineCore) {
        console.log("[EngineAPI] Core attached, checking pending requests");
        this._core = core;

        // Procesar solicitud pendiente si existe
        if (this._pendingRoomRequest) {
            console.log("[EngineAPI] Procesando solicitud pendiente:", this._pendingRoomRequest);
            const { roomId, skinId } = this._pendingRoomRequest;
            this._pendingRoomRequest = null;
            this.setRoom(roomId, skinId);
        }
    }

    setRoom(roomId: string, skinId?: string) {
        console.log("[EngineAPI] setRoom llamado:", roomId, skinId, "core:", !!this._core);

        if (this._core) {
            // Core disponible, ejecutar inmediatamente
            this._core.setRoom(roomId, skinId);
        } else {
            // Core no disponible, guardar para más tarde
            console.log("[EngineAPI] Core no disponible, guardando solicitud pendiente");
            this._pendingRoomRequest = { roomId, skinId };
        }
    }
} 