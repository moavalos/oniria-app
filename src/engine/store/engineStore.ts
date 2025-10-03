
import { create } from "zustand";

type LoadingItem = {
    url: string;
    type: 'gltf' | 'texture' | 'ktx2' | 'audio' | 'binary';
    loaded: boolean;
    progress: number;
    error?: string;
};

type EngineStore = {
    // Room/Skin state
    roomId: string | null;
    skinId: string | null;
    setRoomId: (id: string) => void;
    setSkinId: (id: string) => void;

    // Loading state - nuestro sistema propio
    active: boolean;
    progress: number;
    items: LoadingItem[];
    errors: string[];

    // Loading actions
    startLoading: () => void;
    finishLoading: () => void;
    setProgress: (progress: number) => void;
    setItems: (items: LoadingItem[]) => void;
    updateItem: (index: number, updates: Partial<LoadingItem>) => void;
    addError: (error: string) => void;
    clearErrors: () => void;
    resetLoading: () => void;
};

export const useEngineStore = create<EngineStore>((set, get) => ({
    // Room/Skin state
    roomId: null,
    skinId: null,
    setRoomId: (id) => set({ roomId: id }),
    setSkinId: (id) => set({ skinId: id }),

    // Loading state inicial
    active: false,
    progress: 0,
    items: [],
    errors: [],

    // Loading actions
    startLoading: () => {
        console.log("🚀 EngineStore: Iniciando carga");
        set({
            active: true,
            progress: 0,
            errors: []
        });
    },

    finishLoading: () => {
        console.log("✅ EngineStore: Carga completada");
        set({
            active: false,
            progress: 100
        });
    },

    setProgress: (progress) => {
        const clampedProgress = Math.min(Math.max(progress, 0), 100);
        set({ progress: clampedProgress });
    },

    setItems: (items) => {
        set({ items });
        // El progreso global se calcula y se establece directamente desde useThreeLoader
        // No calculamos aquí para evitar promedios incorrectos
    },

    updateItem: (index, updates) => {
        const { items } = get();
        if (index >= 0 && index < items.length) {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], ...updates };
            get().setItems(newItems);
        }
    },

    addError: (error) => {
        console.error("❌ EngineStore: Error añadido:", error);
        set((state) => ({
            errors: [...state.errors, error]
        }));
    },

    clearErrors: () => {
        set({ errors: [] });
    },

    resetLoading: () => {
        console.log("🔄 EngineStore: Reset del loader");
        set({
            active: false,
            progress: 0,
            items: [],
            errors: []
        });
    }
}));
