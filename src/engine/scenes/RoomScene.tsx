import { RendererSystem } from "@engine/systems";
import { useEngineCore } from "../Engine";
import { useEngineAPI } from "../context/EngineApiProvider";
import { useEffect, useState } from "react";

export default function RoomScene() {
  const core = useEngineCore();
  const { skinId, roomId } = useEngineAPI();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId || !skinId) {
      setError(null);
      return;
    }

    const registerRoomAndSkin = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Usar el nuevo método registerRoom del EngineCore
        // Esto internamente usa el ConfigManager para cargar la configuración
        await core.registerRoom(roomId, skinId);

        console.log(
          `Room '${roomId}' con skin '${skinId}' registrada exitosamente`
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error desconocido al cargar la room";
        setError(errorMessage);
        console.error("Error registrando room:", err);
      } finally {
        setIsLoading(false);
      }
    };

    registerRoomAndSkin();
  }, [roomId, skinId, core]);

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
  return core.activeRoom ? <RendererSystem /> : null;
}
