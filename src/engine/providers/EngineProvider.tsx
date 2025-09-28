import { useEffect } from "react";
import { useEngineStore } from "../store/engineStore";
import type { engineSettings } from "../types/engine.types";

interface EngineProviderProps {
  children: React.ReactNode;
  settings: engineSettings;
}

export default function EngineProvider({
  children,
  settings,
}: EngineProviderProps) {
  const setActiveRoom = useEngineStore((s) => s.setActiveRoom);
  const setSkin = useEngineStore((s) => s.setSkin);

  useEffect(() => {
    setActiveRoom(settings.activeRoom);
    setSkin(settings.activeSkin);
  }, [settings, setActiveRoom, setSkin]);

  return <>{children}</>;
}
