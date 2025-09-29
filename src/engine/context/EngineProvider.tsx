import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { type EngineAPI } from "@engine/types/engine.types";
import { useThree } from "@react-three/fiber";
import { type EngineSettings } from "../types/engine.types";
import { useEngineStore } from "../store/engineStore";

export const EngineContext = createContext<EngineAPI | null>(null);

interface EngineProviderProps extends PropsWithChildren {
  settings: EngineSettings;
}

export default function EngineProvider({
  children,
  settings,
}: EngineProviderProps) {
  const { setActiveRoom, setSkin } = useEngineStore((s) => s);
  const aRoom = useEngineStore((s) => s.activeRoom);
  const aSkin = useEngineStore((s) => s.activeSkin);

  useEffect(() => {
    if (settings.activeRoom && aRoom !== settings.activeRoom)
      setActiveRoom(settings.activeRoom);
    if (settings.activeSkin && aSkin !== settings.activeSkin)
      setSkin(settings.activeSkin);
  }, [settings]);

  const services = useMemo(
    () => ({
      activeRoom: aRoom ?? settings.activeRoom,
      activeSkin: aSkin ?? settings.activeSkin,
      setActiveRoom,
      setSkin,
    }),
    [aRoom, aSkin, settings, setActiveRoom, setSkin]
  );

  return (
    <EngineContext.Provider value={services}>{children}</EngineContext.Provider>
  );
}

export function useEngineAPI() {
  const ctx = useContext(EngineContext);
  if (!ctx) throw new Error("useEngineAPI must be used inside EngineProvider");
  return ctx;
}
