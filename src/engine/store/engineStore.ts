import { create } from "zustand";
import type { Room } from "@engine/entities/Room";
import type { Skin } from "@engine/entities/Skin";


type EngineState = {
    activeRoom: Room | null;
    setActiveRoom: (room: Room) => void;
    activeSkin: Skin | null;
    setSkin: (skin: Skin) => void;
};

export const useEngineStore = create<EngineState>((set) => ({
    activeRoom: null,
    setActiveRoom: (room) => set({ activeRoom: room }),

    activeSkin: null,
    setSkin: (skin) => set({ activeSkin: skin }),
}));