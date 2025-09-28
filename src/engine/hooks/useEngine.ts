import { useEngineStore } from "../store/engineStore";

export function useEngine() {
    const { activeRoom, activeSkin } = useEngineStore();

    return { activeRoom, activeSkin };
}