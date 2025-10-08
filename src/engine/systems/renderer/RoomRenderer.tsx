import { useEffect, useMemo, useState } from "react";
import { useEngineCore } from "@engine/Engine";
import { AssetManager } from "@engine/components";
import { Room } from "@engine/entities";
import { EngineState } from "@/engine/types";
import { PortalRenderer } from "./PortalRenderer";

export default function RoomRenderer() {
  const services = useEngineCore();
  const { setEngineState } = services;

  const [loadedRoom, setLoadedRoom] = useState<Room | null>(null);

  // Generar lista de assets basada en la room activa
  const assets = useMemo(() => {
    if (!services.activeRoom) return [];

    const roomAssets = [];

    // Asset principal del modelo GLTF
    roomAssets.push({
      url: `/models/${services.activeRoom.id}.gltf`,
      type: "gltf" as const,
    });

    // Assets de texturas del skin activo
    if (services.activeRoom.skin) {
      roomAssets.push({
        url: `/skins/${services.activeRoom.skin.id}_object.ktx2`,
        type: "ktx2" as const,
      });
      roomAssets.push({
        url: `/skins/${services.activeRoom.skin.id}_wall.ktx2`,
        type: "ktx2" as const,
      });
    }

    return roomAssets;
  }, [services.activeRoom]);

  // Callback cuando los assets están cargados
  const handleAssetsLoaded = (assets: { [key: string]: any }) => {
    if (!services.activeRoom) return;

    try {
      // Crear instancia de Room con el skin actual
      const room = services.activeRoom;

      // Configurar la scene con el modelo GLTF
      const roomModel = assets[services.activeRoom.id]; // Nombre del archivo GLTF
      if (roomModel) {
        room.setScene(roomModel.scene);
      }

      // Configurar texturas si están disponibles
      const objectTexture = assets[`${services.activeRoom.skin.id}_object`];
      const environmentTexture = assets[`${services.activeRoom.skin.id}_wall`];

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
        const materialService = services.getMaterialService();
        await materialService.applyMaterialsToRoom(loadedRoom);
      } catch (error) {
        console.error("Failed to apply materials:", error);
      }
    };

    applyMaterials();
  }, [loadedRoom, services]);

  // Controlar el estado del engine basado en la disponibilidad de room
  useEffect(() => {
    if (!services.activeRoom || assets.length === 0) {
      setEngineState(EngineState.INITIALIZING);
    }
  }, [services.activeRoom, assets.length, setEngineState]);

  const scene = useMemo(() => {
    return loadedRoom?.getScene();
  }, [loadedRoom]);

  // Cambiar a READY cuando la escena esté completamente cargada
  useEffect(() => {
    if (scene && loadedRoom?.hasScene()) {
      setEngineState(EngineState.READY);
    }
  }, [scene, loadedRoom, setEngineState]);

  // Si no hay room activa, no renderizar nada
  if (!services.activeRoom || assets.length === 0) {
    return null;
  }

  // Portal del room cargado
  const portal = useMemo(() => {
    return loadedRoom?.getPortal();
  }, [loadedRoom]);

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
