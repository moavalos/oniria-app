import { useFrame } from "@react-three/fiber";
import { useEngineAPI } from "@/engine/context/EngineApiProvider";

export default function FrameSystem() {
  const { loopService } = useEngineAPI();

  useFrame((state, delta) => {
    if (!loopService) return;
    loopService.tick(state, delta);
  });

  return null;
}
