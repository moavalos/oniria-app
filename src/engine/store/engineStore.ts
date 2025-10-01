
import { create } from "zustand";

type EngineStore = {
    roomId: string | null;
    skinId: string | null;
    setRoomId: (id: string) => void;
    setSkinId: (id: string) => void;
};

export const useEngineStore = create<EngineStore>((set) => ({
    roomId: null,
    skinId: null,
    setRoomId: (id) => set({ roomId: id }),
    setSkinId: (id) => set({ skinId: id }),
}));
