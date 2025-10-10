import { useEffect, useMemo, useState } from "react";
import { useEngineCore } from "@engine/Engine";
import { AssetManager } from "@engine/components";
import { Room } from "@engine/entities";
import { EngineState } from "@/engine/types";
import { PortalRenderer } from "./PortalRenderer";

export default function RoomRenderer() {
  const core = useEngineCore();
  const { setEngineState } = core;

  const [loadedRoom, setLoadedRoom] = useState<Room | null>(null);

  // Generar lista de assets basada en la room activa
  const assets = useMemo(() => {
    if (!core.activeRoom) return [];

    const roomAssets = [];

    // Asset principal del modelo GLTF
    roomAssets.push({
      url: `/models/${core.activeRoom.id}.gltf`,
      type: "gltf" as const,
    });

    // Assets de texturas del skin activo
    if (core.activeRoom.skin) {
      roomAssets.push({
        url: `/skins/${core.activeRoom.skin.id}_object.ktx2`,
        type: "ktx2" as const,
      });
      roomAssets.push({
        url: `/skins/${core.activeRoom.skin.id}_wall.ktx2`,
        type: "ktx2" as const,
      });
    }

    return roomAssets;
  }, [core.activeRoom]);

  // Callback cuando los assets están cargados
  const handleAssetsLoaded = (assets: { [key: string]: any }) => {
    console.log("🏠 RoomRenderer - handleAssetsLoaded called", {
      roomId: core.activeRoom?.id,
      assetsKeys: Object.keys(assets),
      timestamp: Date.now(),
      stack: new Error().stack?.split("\n")[1]?.trim(),
    });

    if (!core.activeRoom) return;

    try {
      // Crear instancia de Room con el skin actual
      const room = core.activeRoom;

      // Configurar la scene con el modelo GLTF
      const roomModel = assets[core.activeRoom.id]; // Nombre del archivo GLTF
      if (roomModel) {
        room.setScene(roomModel.scene);
      }

      // Configurar texturas si están disponibles
      const objectTexture = assets[`${core.activeRoom.skin.id}_object`];
      const environmentTexture = assets[`${core.activeRoom.skin.id}_wall`];

      if (objectTexture && environmentTexture) {
        room.setTextures({
          objectTexture,
          environmentTexture,
        });
      }

      setLoadedRoom(room);
    } catch (error) {
      console.error("RoomRenderer: Error procesando assets:", error);
    }
  };

  // Carga de materiales y configuración del portal
  useEffect(() => {
    if (!loadedRoom || !loadedRoom.hasScene()) return;

    const applyMaterials = async () => {
      try {
        const materialService = core.getMaterialService();
        await materialService.applyMaterialsToRoom(loadedRoom);
      } catch (error) {
        console.error("Failed to apply materials:", error);
      }
    };

    applyMaterials();
  }, [loadedRoom, core]);

  // Controlar el estado del engine basado en la disponibilidad de room
  useEffect(() => {
    if (!core.activeRoom || assets.length === 0) {
      setEngineState(EngineState.INITIALIZING);
    }
  }, [core.activeRoom, assets.length, setEngineState]);

  const scene = useMemo(() => {
    return loadedRoom?.getScene();
  }, [loadedRoom]);

  // Portal del room cargado
  const portal = useMemo(() => {
    const foundPortal = loadedRoom?.getPortal();
    console.log("🏠 RoomRenderer - Portal from loadedRoom:", {
      hasLoadedRoom: !!loadedRoom,
      hasPortal: !!foundPortal,
      portalName: foundPortal?.name,
      portalId: foundPortal?.id,
      portalUuid: foundPortal?.uuid,
      sceneUuid: scene?.uuid,
      portalParentUuid: foundPortal?.parent?.uuid,
      isPortalInScene: foundPortal?.parent?.uuid === scene?.uuid,
    });
    return foundPortal;
  }, [loadedRoom, scene]);

  // Cambiar a READY cuando la escena esté completamente cargada
  useEffect(() => {
    if (scene && loadedRoom?.hasScene()) {
      setEngineState(EngineState.READY);
    }
  }, [scene, loadedRoom, setEngineState]);

  // Si no hay room activa, no renderizar nada
  if (!core.activeRoom || assets.length === 0) {
    return null;
  }

  return (
    <AssetManager
      assets={assets}
      onLoaded={handleAssetsLoaded}
      fallback={<group />} // Fallback vacío mientras carga
    >
      {scene ? (
        <>
          <primitive object={scene} />
          <PortalRenderer portal={portal} />
        </>
      ) : null}
    </AssetManager>
  );
}
