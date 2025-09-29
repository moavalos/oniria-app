import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useThree } from "@react-three/fiber";
import { type EngineAPI, type UserSettings } from "@engine/types";
import { useEngineStore } from "@engine/store/engineStore";
import { AnimationService, LoopService } from "@engine/services";

export const EngineContext = createContext<EngineAPI | null>(null);

interface EngineProviderProps extends PropsWithChildren {
  settings?: UserSettings;
}

export default function EngineProvider({
  children,
  settings,
}: EngineProviderProps) {
  const { scene, camera, gl } = useThree();
  const { setActiveRoom, setSkin } = useEngineStore((s) => s);
  const aRoom = useEngineStore((s) => s.activeRoom);
  const aSkin = useEngineStore((s) => s.activeSkin);

  // hidratar store desde settings
  useEffect(() => {
    if (settings?.activeRoom) setActiveRoom(settings.activeRoom);
    if (settings?.activeSkin) setSkin(settings.activeSkin);
  }, [settings]);

  // inicializar servicios core una sola vez
  const loopService = useMemo(() => new LoopService(), []);

  const services: EngineAPI = {
    loopService,
    scene,
    camera,
    gl,
    activeRoom: aRoom ?? settings?.activeRoom ?? null,
    activeSkin: aSkin ?? settings?.activeSkin ?? null,
    setActiveRoom,
    setSkin,
  };

  return (
    <EngineContext.Provider value={services}>{children}</EngineContext.Provider>
  );
}

export function useEngineAPI() {
  const ctx = useContext(EngineContext);
  if (!ctx)
    throw new Error("useEngineAPI debe usarse dentro de EngineProvider");
  return ctx;
}
