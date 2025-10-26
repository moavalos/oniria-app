import { Room, useEngineCore } from "@engine/core";
import { useEffect, useState } from "react";
import { RoomManager } from "../services/managers/RoomManager";
import { PortalManager } from "../services/managers/PortalManager";
import { EngineState } from "@engine/core";
import { Sparkles } from "@react-three/drei";
import NodeScene from "./NodeScene";
import NebulaScene from "./NebulaScene";
import ImageScene from "./ImageScene";

/**
 * Escena principal para renderizar salas 3D.
 * Gestiona la carga y renderizado de salas con sus respectivos skins.
 */
export default function RoomScene() {
  const core = useEngineCore();
  const [room, setRoom] = useState<Room | null>(null);

  const [renderNode, setRenderNode] = useState<boolean>(false);
  const [renderNebula, setRenderNebula] = useState<boolean>(false);
  const [renderImage, setRenderImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!core) return;

    // Verificar que el core esté en estado READY antes de usar servicios
    if (core.getState() !== EngineState.READY) {
      // Escuchar el evento de cambio de estado del engine
      const handleEngineStateChange = (state: EngineState) => {
        if (state === EngineState.READY) {
          setupRoomManager();
        }
      };

      core.on("engine:state", handleEngineStateChange);

      return () => {
        core.off("engine:state");
      };
    } else {
      // El core ya está listo, configurar inmediatamente
      setupRoomManager();
    }

    function setupRoomManager() {
      const roomManager = core.getService(RoomManager);
      const portalManager = core.getService(PortalManager);

      // Validar que los servicios existen
      if (!roomManager) {
        console.error("[RoomScene] RoomManager no está disponible en el core");
        return;
      }

      if (!portalManager) {
        console.error(
          "[RoomScene] PortalManager no está disponible en el core"
        );
        return;
      }

      // 1. Verificar si ya hay una room cargada
      const currentRoom = roomManager.getCurrentRoom();
      if (currentRoom) {
        console.log(
          "[RoomScene] Room ya existe al inicializar:",
          currentRoom.get_Id()
        );
        setRoom(currentRoom);
      }

      // 2. Escuchar cuando el Core solicita cambio de room
      const handleRoomChangeRequested = async ({
        roomId,
        skinId,
      }: {
        roomId: string;
        skinId?: string;
      }) => {
        console.log(
          "[RoomScene] Core solicita cambio de room:",
          roomId,
          skinId
        );

        try {
          // RoomScene es responsable de cargar la room
          await roomManager.loadRoom({
            room: { id: roomId },
            skin: skinId ? { id: skinId } : undefined,
          });
        } catch (error) {
          console.error("[RoomScene] Error cargando room:", error);
        }
      };

      // 3. Escuchar cuando RoomManager tiene room lista
      const handleReady = ({ room }: { room: Room }) => {
        setRoom(room);

        const portal = room.getPortal();

        if (portal) {
          portalManager.createPortal(portal);
          // Iniciar la animación del portal
          portalManager.startPortalAnimation();
        }
      };

      const handleUnload = () => {
        console.log("[RoomScene] Room unloaded");
        setRoom(null);
      };

      // Configurar listeners del Core con namespace 'roomscene'
      core.on("room:change:requested.roomscene", handleRoomChangeRequested);

      // Configurar listeners del RoomManager con namespace 'roomscene'
      core.on("room:ready.roomscene", handleReady);
      core.on("room:unloading.roomscene", handleUnload);

      // Cleanup function para todos los listeners
      return () => {
        core.off("room:change:requested.roomscene");
        core.off("room:ready.roomscene");
        core.off("room:unloading.roomscene");
      };
    }
  }, [core]);

  //listener para nodos
  useEffect(() => {
    if (!core) return;

    let timer: NodeJS.Timeout | null = null;

    const handleInsidePortal = ({ travel }: { travel: boolean }) => {
      if (core.getCurrentNode()) return;
      const portalManager = core.getService(PortalManager);
      if (travel) {
        portalManager.startTravel();
        timer = setTimeout(() => {
          portalManager.stopTravel();
          setRenderNebula(true);
        }, 3000);
      } else {
        setRenderNode(true);
      }
    };

    const handleOutsidePortal = () => {
      console.log("salio del portal");
      setRenderNode(false);
      setRenderNebula(false);

      // Limpiar timer si existe cuando sale del portal
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    core.on("camera:inside-portal", handleInsidePortal);
    core.on("camera:outside-portal", handleOutsidePortal);
    return () => {
      core.off("camera:inside-portal");
      core.off("camera:outside-portal");

      // Limpiar timer en cleanup
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [core]);

  // Listener para mostrar/ocultar imagen
  useEffect(() => {
    if (!core) return;

    const handleShowImage = ({ imageUrl }: { imageUrl: string }) => {
      console.log("[RoomScene] Mostrar imagen con URL:", imageUrl);
      setImageUrl(imageUrl);
      setRenderImage(true);
    };

    const handleImageDestroyed = () => {
      console.log("[RoomScene] Imagen destruida, desmontando escena");
      setImageUrl(null);
      setRenderImage(false);
    };

    core.on("image:show", handleShowImage);
    core.on("image:destroyed", handleImageDestroyed);

    return () => {
      core.off("image:show");
      core.off("image:destroyed");
    };
  }, [core]);

  if (!room) return null;

  // Renderizar room y portal por separado
  return (
    <>
      <primitive object={room.get_Scene()!} />

      {renderNode && (
        <NodeScene
          position={[-1.1, 2.85, -6.4]}
          rotation={[0, 0, 0]}
          scale={2}
        />
      )}
      {renderNebula && (
        <NebulaScene
          position={[-1.2, 3, -6.2]}
          rotation={[0, 0, 0]}
          scale={1.6}
        />
      )}
      {renderImage && imageUrl && (
        <ImageScene
          position={[-1.24, 2.8, -5.2]}
          rotation={[0, 0, 0]}
          scale={0.8}
          imageUrl={imageUrl}
        />
      )}

      <Sparkles
        count={50}
        size={6}
        position={[-1.2, 3, -2.2]}
        scale={1.3}
        speed={0.4}
      />
    </>
  );
}
