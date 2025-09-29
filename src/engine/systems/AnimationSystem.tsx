import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { AnimationService } from "@engine/services";

export default function AnimationSystem() {
  const { scene } = useThree();

  const animationService = useMemo(() => {
    if (!scene) return null;
    return new AnimationService(scene);
  }, [scene]);

  useFrame((_, delta) => {
    if (!animationService) return;
    animationService.update(delta);
  });

  return <div>AnimationSystem</div>;
}
