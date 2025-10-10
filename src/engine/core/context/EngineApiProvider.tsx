import { createContext, useContext, useMemo, useCallback } from "react";

import { useEngineStore } from "../store/engineStore";

type EngineContextAPI = {
  setRoom: (roomId: string, skinId: string) => void;
  roomId?: string | null;
  skinId?: string | null;
};

const EngineAPIContext = createContext<EngineContextAPI | null>(null);

/**
 * Provider que expone la API pública del motor para configurar salas y skins
 *
 * @param children - Componentes hijos que tendrán acceso a la API del motor
 */
export function EngineApiProvider({ children }: React.PropsWithChildren) {
  const roomId = useEngineStore((s) => s.roomId);
  const skinId = useEngineStore((s) => s.skinId);
  const setRoomId = useEngineStore((s) => s.setRoomId);
  const setSkinId = useEngineStore((s) => s.setSkinId);

  /**
   * Configura una nueva sala y skin en el motor
   *
   * @param rId - ID de la sala
   * @param sId - ID del skin
   */
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

/**
 * Hook para acceder a la API pública del motor
 *
 * @returns API del motor con métodos para configurar salas y skins
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useEngineAPI() {
  const ctx = useContext(EngineAPIContext);
  if (!ctx)
    throw new Error("useEngineAPI debe usarse dentro de EngineApiProvider");
  return ctx;
}
