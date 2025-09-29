import { useFrame } from "@react-three/fiber";
import { useEngineAPI } from "@engine/context/EngineProvider";

export default function AnimationSystem() {
  const { animationService } = useEngineAPI();

  useFrame((_, delta) => {
    if (!animationService) return;
    animationService.update(delta);
  });

  return <div>AnimationSystem</div>;
}
