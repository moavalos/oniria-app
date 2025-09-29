import { useThree } from "@react-three/fiber";
import { useEngineStore } from "../store/engineStore";

export function useEngine() {
    const { activeRoom, activeSkin } = useEngineStore();
    const { scene } = useThree();

    return { activeRoom, activeSkin, scene };
}
