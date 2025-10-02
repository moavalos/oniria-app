import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useEngineCore } from "@engine/Engine";
import { useLoader } from "@engine/hooks/useLoader";

export default function RoomRenderer() {
  const core = useEngineCore();
  const { loopService } = core;
  const portalMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Solo usar useLoader si hay una room activa en el core
  const { room } = useLoader({
    activeRoom: core.activeRoom,
  });

  //Configuracion de uniforms del Portal
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

  // Carga de materiales y configuración del portal
  useEffect(() => {
    if (!room || !room.hasScene()) return;

    const applyMaterials = async () => {
      try {
        const materialService = core.getMaterialService();
        await materialService.applyMaterialsToRoom(room);

        const portal = room.getPortal();
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
  }, [room, portalUniforms]);

  // Animación del portal
  useEffect(() => {
    if (!loopService) return;
    const cb = (_: unknown, dt: number) => {
      if (!portalMaterialRef.current) return;
      portalMaterialRef.current.uniforms.uTime.value += dt;
    };
    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, []);

  const scene = useMemo(() => {
    return room?.getScene();
  }, [room]);

  return scene ? <primitive object={scene} /> : null;
}
