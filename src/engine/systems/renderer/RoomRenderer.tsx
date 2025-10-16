import { useEffect, useMemo } from "react";
import { useEngineCore } from "@engine/core";
import { Room } from "@engine/entities";
import { MaterialService } from "@engine/services";

interface RoomRendererProps {
  room: Room;
}

/**
 * Renderer principal para salas 3D.
 * Renderiza rooms que ya han sido completamente materializadas por el RoomManager.
 * La room recibida ya tiene scene, texturas y configuración aplicadas.
 */
export default function RoomRenderer({ room }: RoomRendererProps) {
  const core = useEngineCore();

  // Aplicar materiales cuando la room esté lista
  useEffect(() => {
    if (!room || !room.has_Scene()) return;

    const applyMaterials = async () => {
      try {
        const materialService = core.getService(MaterialService);
        await materialService.applyMaterialsToRoom(room);
        console.log(
          "🎨 RoomRenderer - Materiales aplicados a room:",
          room.get_Id()
        );
      } catch (error) {
        console.error("❌ RoomRenderer - Error aplicando materiales:", error);
      }
    };

    applyMaterials();
  }, [room, core]);

  // Obtener la scene de la room (ya materializada)
  const scene = useMemo(() => {
    const roomScene = room?.get_Scene();
    console.log("🏠 RoomRenderer - Scene obtenida:", {
      roomId: room?.get_Id(),
      hasScene: !!roomScene,
      sceneUuid: roomScene?.uuid,
      children: roomScene?.children.length || 0,
    });
    return roomScene;
  }, [room]);

  // Si no hay scene, no renderizar nada
  if (!scene) {
    console.warn("⚠️ RoomRenderer - No hay scene para renderizar");
    return null;
  }

  return <primitive object={scene} />;
}
