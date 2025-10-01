// engine/context/EngineCoreProvider.tsx
import { createContext, useContext, useMemo } from "react";
import { Room } from "@engine/entities/Room";
import { Skin } from "@engine/entities/Skin";
import { useEngineStore } from "../store/engineStore";
import { type EngineCoreAPI } from "../types";

export const EngineCoreContext = createContext<EngineCoreAPI | null>(null);
interface Props extends React.PropsWithChildren {}

export function EngineCoreProvider({ children }: Props) {
  const { roomId, skinId } = useEngineStore();
  console.log("EngineCoreProvider render", { roomId, skinId });

  const skin = useMemo(() => {
    if (!skinId) return null;
    return new Skin(
      skinId,
      `skins/${skinId}_object.ktx2`,
      `skins/${skinId}_wall.ktx2`
    );
  }, [skinId]);

  const room = useMemo(() => {
    if (!roomId || !skin) return null;
    return new Room(roomId, `models/${roomId}.gltf`, skin);
  }, [roomId, skin]);

  const coreAPI = {
    activeRoom: room,
    activeSkin: skin,
  };

  return (
    <EngineCoreContext.Provider value={coreAPI}>
      {children}
    </EngineCoreContext.Provider>
  );
}

export function useEngineCore() {
  const ctx = useContext(EngineCoreContext);
  if (!ctx)
    throw new Error("useEngineCore debe usarse dentro de EngineCoreProvider");
  return ctx;
}
