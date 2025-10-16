import { Room, useEngineCore } from "@engine/core";
import { RoomRenderer } from "../systems";
import { PortalRenderer } from "../systems/renderer/PortalRenderer";
import { useEffect, useState } from "react";
import { RoomManager } from "../services/room/RoomManager";
import { PortalManager } from "../services/portal/PortalManager";
import { EngineState } from "@engine/core";
import * as THREE from "three";

/**
 * Escena principal para renderizar salas 3D.
 * Gestiona la carga y renderizado de salas con sus respectivos skins.
 */
export default function RoomScene() {
  const core = useEngineCore();
  const [room, setRoom] = useState<Room | null>(null);
  const [portalObject, setPortalObject] = useState<THREE.Object3D | null>(null);

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

        // Obtener el portal de la room y asignarlo al PortalManager
        console.log("[RoomScene] Llamando room.getPortal()...");
        const portal = room.getPortal();
        console.log("[RoomScene] Portal obtenido:", portal);
        console.log("[RoomScene] Portal type:", portal?.type);
        console.log("[RoomScene] Portal name:", portal?.name);

        if (portal) {
          const portalEntity = portalManager.createPortal(portal);
          setPortalObject(portal);
          console.log(
            "[RoomScene] Portal creado y asignado al PortalManager:",
            portalEntity.id
          );
        } else {
          console.warn("[RoomScene] No se encontró portal en la room");
          setPortalObject(null);
        }
      };

      const handleUnload = () => {
        console.log("[RoomScene] Room unloaded");
        setRoom(null);
        setPortalObject(null);
      };

      // Configurar listeners del Core
      core.on("room:change:requested", handleRoomChangeRequested);

      // Configurar listeners del RoomManager
      roomManager.on("room:ready", handleReady);
      roomManager.on("room:unloading", handleUnload);

      // Cleanup function para todos los listeners
      return () => {
        core.off("room:change:requested");
        roomManager.off("room:ready");
        roomManager.off("room:unloading");
      };
    }
  }, [core]);

  console.log("[RoomScene]: room cargada", room);
  console.log("[RoomScene]: portal obtenido", portalObject);

  if (!room) return null;

  // Renderizar room y portal por separado
  return (
    <>
      <RoomRenderer room={room} />
      {portalObject && <PortalRenderer portal={portalObject} />}
    </>
  );
}
