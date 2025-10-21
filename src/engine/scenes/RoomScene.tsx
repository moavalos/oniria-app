import { Room, useEngineCore } from "@engine/core";
import { useEffect, useState } from "react";
import { RoomManager } from "../services/managers/RoomManager";
import { PortalManager } from "../services/managers/PortalManager";
import { EngineState } from "@engine/core";
import { Sparkles } from "@react-three/drei";
import NodeScene from "./NodeScene";

/**
 * Escena principal para renderizar salas 3D.
 * Gestiona la carga y renderizado de salas con sus respectivos skins.
 */
export default function RoomScene() {
  const core = useEngineCore();
  const [room, setRoom] = useState<Room | null>(null);

  const [renderNode, setRenderNode] = useState<boolean>(false);

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
      const handleReady = ({ room }: { room: Room; skin?: any }) => {
        console.log("[RoomScene] Room ready:", room.get_Id());
        console.log("[RoomScene] Room scene exists:", !!room.get_Scene());
        console.log(
          "[RoomScene] Room scene children count:",
          room.get_Scene()?.children.length || 0
        );

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

      // Configurar listeners del Core
      core.on("room:change:requested", handleRoomChangeRequested);

      // Configurar listeners del RoomManager
      core.on("room:ready", handleReady);
      core.on("room:unloading", handleUnload);

      // Cleanup function para todos los listeners
      return () => {
        core.off("room:change:requested");
        core.off("room:ready");
        core.off("room:unloading");
      };
    }
  }, [core]);

  //listener para nodos
  useEffect(() => {
    if (!core) return;

    const handleInsidePortal = ({ travel }: { travel: boolean }) => {
      if (core.getCurrentNode()) return;
      const portalManager = core.getService(PortalManager);
      if (travel) {
        portalManager.startTravel();
        setTimeout(() => {
          portalManager.stopTravel();
        }, 3000);
      } else {
        setRenderNode(true);
      }
    };

    const handleOutsidePortal = () => {
      console.log("salio del portal");
      setRenderNode(false);
    };

    core.on("camera:inside-portal", handleInsidePortal);
    core.on("camera:outside-portal", handleOutsidePortal);
    return () => {
      core.off("core:camera:inside-portal");
      core.off("core:camera:outside-portal");
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
