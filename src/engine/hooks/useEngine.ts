import { useEngineAPI } from "../context/SceneProvider";
import { useEngineStore } from "../store/engineStore";

export function useEngine() {
    const { roomId, skinId } = useEngineStore();
    const { activeRoom } = useEngineAPI();

    return { roomId, skinId, activeRoom };
}
