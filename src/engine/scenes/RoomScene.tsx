import { RoomRenderer } from "@engine/systems";
import { useEngineCore } from "../Engine";
import { useEngineAPI } from "../context/EngineApiProvider";
import { useEffect, useState } from "react";

interface RoomSceneProps {
  onError?: (error: string) => void;
  onLoad?: () => void;
}

export default function RoomScene({ onError, onLoad }: RoomSceneProps) {
  const core = useEngineCore();
  const { skinId, roomId } = useEngineAPI();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRegistered, setLastRegistered] = useState<string>("");

  useEffect(() => {
    if (!roomId || !skinId) {
      setError(null);
      return;
    }

    // Solo registrar si es diferente a la última registrada
    const currentKey = `${roomId}-${skinId}`;
    if (currentKey === lastRegistered) {
      return;
    }

    const registerRoomAndSkin = () => {
      try {
        setIsLoading(true);
        setError(null);

        core.registerRoom(roomId, skinId);
        setLastRegistered(currentKey);

        if (onLoad) {
          onLoad();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error desconocido al cargar la room";
        setError(errorMessage);
        console.error("Error registrando room:", err);
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    registerRoomAndSkin();
  }, [roomId, skinId, lastRegistered]);

  // Mostrar estados de carga y error
  if (isLoading) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" />
        {/* Placeholder mientras carga */}
      </mesh>
    );
  }

  if (error) {
    console.error("Error en RoomScene:", error);
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
        {/* Placeholder de error */}
      </mesh>
    );
  }

  // Solo renderizar si hay una room activa registrada en el core
  return core.activeRoom ? <RoomRenderer /> : null;
}
