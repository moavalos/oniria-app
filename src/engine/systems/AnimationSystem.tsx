import { useEffect, useState } from "react";
import { useEngineAPI } from "@/engine/context/EngineApiProvider";
import type { AnimationAction } from "../config/room.type";

export default function AnimationSystem() {
  const { activeRoom, animationService } = useEngineAPI();
  const [animatables, setAnimatables] = useState<
    Record<string, AnimationAction>
  >({});

  useEffect(() => {
    const ao = activeRoom?.getAnimatableObjects();
    setAnimatables(ao ?? {});
  }, [activeRoom]);

  // ejecutar animaciones
  useEffect(() => {
    if (!animationService || !activeRoom?.getScene()) return;
    Object.values(animatables).forEach((config) => {
      animationService.play(config);
    });

    return () => {
      animationService.stopAll();
    };
  }, [animationService, animatables, activeRoom]);

  return null;
}
