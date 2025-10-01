import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useLoader } from "@engine/hooks/useLoader";
import { MaterialService } from "@engine/services";
import { useEngineAPI } from "@/engine/context/SceneProvider";

export default function RendererSystem() {
  const { activeRoom, loopService } = useEngineAPI();
  const portalMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  // cargar room
  const { room } = useLoader({ activeRoom });

  if (!room) return null;

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
    if (!activeRoom) return;
    const materialService = new MaterialService();
    materialService.applyMaterialsToRoom(room);
    materialService.applyMaterialsToPortal(room.getPortal(), portalUniforms);
    const material = (room.getPortal() as THREE.Mesh)
      ?.material as THREE.ShaderMaterial;
    if (!material) return;
    portalMaterialRef.current = material as THREE.ShaderMaterial;
  }, [room, portalUniforms]);

  useEffect(() => {
    if (!loopService) return;

    const cb = (_: unknown, dt: number) => {
      if (!portalMaterialRef.current) return;
      portalMaterialRef.current.uniforms.uTime.value += dt;
    };
    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, [loopService]);

  // useEffect(() => {
  //   if (!registerService || !room.getScene()) return;
  //   registerService.registerScene(room.getScene()!);
  //   return () => {
  //     registerService.unregisterScene(room.getScene()!);
  //   };
  // }, [registerService, room]);

  const scene = useMemo(() => room.getScene(), [room]);

  return scene && <primitive object={scene} />;
}
