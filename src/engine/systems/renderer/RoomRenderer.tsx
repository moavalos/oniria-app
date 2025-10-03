import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEngineCore } from "@engine/Engine";
import { AssetManager } from "@engine/components";
import { Room } from "@engine/entities";

export default function RoomRenderer() {
  const core = useEngineCore();
  const { loopService } = core;

  const [loadedRoom, setLoadedRoom] = useState<Room | null>(null);
  const portalMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

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

  // Configuración de uniforms del Portal
  const portalUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPortalAlpha: { value: 1.0 },
      uDensity: { value: 4.5 },
      uRadius: { value: 1.2 },
      uAngle: { value: 3.2 },
      uHue: { value: 0.74 },
      uSaturation: { value: 0.58 },
      uRadiusFactor: { value: 1.5 },
      uGainOffset: { value: 0.5 },
      uGainScale: { value: 3.0 },
    }),
    []
  );

  // Callback cuando los assets están cargados
  const handleAssetsLoaded = (assets: { [key: string]: any }) => {
    console.log("✅ RoomRenderer: Assets cargados:", assets);
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
      console.error("❌ RoomRenderer: Error procesando assets:", error);
    }
  };

  // Carga de materiales y configuración del portal
  useEffect(() => {
    if (!loadedRoom || !loadedRoom.hasScene()) return;

    const applyMaterials = async () => {
      try {
        const materialService = core.getMaterialService();
        await materialService.applyMaterialsToRoom(loadedRoom);

        const portal = loadedRoom.getPortal();
        if (portal) {
          materialService.applyMaterialsToPortal(portal, portalUniforms);
          const material = (portal as THREE.Mesh)
            ?.material as THREE.ShaderMaterial;
          if (material) {
            portalMaterialRef.current = material;
          }
        }
      } catch (error) {
        console.error("Failed to apply materials:", error);
      }
    };

    applyMaterials();
  }, [loadedRoom, portalUniforms, core]);

  // Animación del portal
  useEffect(() => {
    if (!loopService || !loadedRoom?.getScene()) return;
    const cb = (_: unknown, dt: number) => {
      if (!portalMaterialRef.current) return;
      portalMaterialRef.current.uniforms.uTime.value += dt;
    };
    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, [loopService, loadedRoom]);

  const scene = useMemo(() => {
    return loadedRoom?.getScene();
  }, [loadedRoom]);

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
      {scene ? <primitive object={scene} /> : null}
    </AssetManager>
  );
}
