import { useEffect, useMemo } from "react";
import { useEngineAPI } from "@engine/context/EngineProvider";
import { AnimationService } from "../services";

export default function AnimationSystem() {
  const { activeRoom, scene } = useEngineAPI();
  if (!scene) return null;

  const animationSettings = activeRoom?.getSettings().animation || [];
  const animationService = useMemo(() => new AnimationService(scene), [scene]);

  useEffect(() => {
    if (!animationService) return;
    animationSettings.forEach((config) => {
      animationService.play(config);
    });
    return () => animationService.stopAll();
  }, [animationService]);

  return null;
}
