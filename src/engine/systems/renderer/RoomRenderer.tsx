import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { MaterialService } from "@/engine/core";
import { useEngineCore } from "../../Engine";
import { useLoader } from "@engine/hooks/useLoader";

export default function RoomRenderer() {
  const core = useEngineCore();
  const portalMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Solo usar useLoader si hay una room activa en el core
  const { room } = useLoader({
    activeRoom: core.activeRoom,
  });
  console.log(room);

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

  useEffect(() => {
    if (!room || !room.hasScene()) return;

    const applyMaterials = async () => {
      try {
        const materialService = new MaterialService();
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

  // Comentado por ahora - se puede reactivar cuando LoopService esté disponible
  useEffect(() => {
    const loopService = core.getLoopService();
    console.log(loopService);
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
