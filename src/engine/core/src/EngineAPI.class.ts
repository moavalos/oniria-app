import type { EngineCore } from "./EngineCore.class";

export class EngineAPI {
    private _core: EngineCore | null = null;

    attachCore(core: EngineCore) {
        this._core = core;
    }

    setRoom(roomId: string, skinId?: string) {
        this._core?.setRoom(roomId, skinId)
    }
} 