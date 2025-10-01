import { useFrame } from "@react-three/fiber";
import { useEngineAPI } from "@/engine/context/SceneProvider";

export default function FrameSystem() {
  const { loopService } = useEngineAPI();

  useFrame((state, delta) => {
    if (!loopService) return;
    loopService.tick(state, delta);
  });

  return null;
}
