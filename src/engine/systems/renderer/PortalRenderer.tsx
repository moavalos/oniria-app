import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useEngineCore } from "@engine/core";
import { EngineState } from "@engine/core";
import NodeScene from "@/engine/scenes/NodeScene";

interface PortalRendererProps {
  portal?: THREE.Object3D;
}

export const PortalRenderer = ({ portal }: PortalRendererProps) => {
  const core = useEngineCore();
  const { loopService, engineState } = core;
  const materialService = core.getMaterialService();
  const portalMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const isEngineReady = engineState === EngineState.READY;

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

  // Aplicar material y configurar animación del portal
  useEffect(() => {
    if (!isEngineReady || !portal || !materialService || !loopService) {
      return;
    }

    console.log("🚪 PortalRenderer - Aplicando material al portal");

    // Aplicar el material del portal
    materialService.applyMaterialsToPortal(portal, portalUniforms);

    // Guardar referencia al material
    const portalMesh = portal as THREE.Mesh;
    if (portalMesh.material && "uniforms" in portalMesh.material) {
      portalMaterialRef.current = portalMesh.material as THREE.ShaderMaterial;
    }

    // Configurar animación
    const animatePortal = (_: unknown, delta: number) => {
      if (portalMaterialRef.current?.uniforms?.uTime) {
        portalMaterialRef.current.uniforms.uTime.value += delta;
      }
    };

    loopService.subscribe(animatePortal);

    return () => {
      loopService.unsubscribe(animatePortal);
    };
  }, [isEngineReady, portal, materialService, loopService, portalUniforms]);

  return <NodeScene />;
};
