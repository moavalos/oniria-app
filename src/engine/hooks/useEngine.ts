import { useThree } from "@react-three/fiber";
import { useEngineStore } from "../store/engineStore";

export function useEngine() {
    const { roomId, skinId } = useEngineStore();
    const { scene } = useThree();

    return { roomId, skinId, scene, };
}
