// EngineApiProvider.tsx
import { createContext, useContext, useMemo, useCallback } from "react";
import { useEngineStore } from "@engine/store/engineStore";

type EngineContextAPI = {
  setRoom: (roomId: string, skinId: string) => void;
  // Getters opcionales (referencias estables)
  roomId?: string | null;
  skinId?: string | null;
};

const EngineAPIContext = createContext<EngineContextAPI | null>(null);

export function EngineApiProvider({ children }: React.PropsWithChildren) {
  const roomId = useEngineStore((s) => s.roomId);
  const skinId = useEngineStore((s) => s.skinId);
  const setRoomId = useEngineStore((s) => s.setRoomId);
  const setSkinId = useEngineStore((s) => s.setSkinId);

  const setRoom = useCallback(
    (rId: string, sId: string) => {
      setRoomId(rId);
      setSkinId(sId);
    },
    [setRoomId, setSkinId]
  );

  const value = useMemo(
    () => ({ setRoom, roomId, skinId }),
    [setRoom, roomId, skinId]
  );

  return (
    <EngineAPIContext.Provider value={value}>
      {children}
    </EngineAPIContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEngineAPI() {
  const ctx = useContext(EngineAPIContext);
  if (!ctx)
    throw new Error("useEngineAPI debe usarse dentro de EngineApiProvider");
  return ctx;
}
