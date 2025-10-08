import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useEngineCore } from "@/engine/Engine";
import { EngineState } from "@/engine/types";
import NodeScene from "@/engine/scenes/NodeScene";

interface PortalRendererProps {
  portal?: THREE.Object3D;
}

export const PortalRenderer = ({ portal }: PortalRendererProps) => {
  const services = useEngineCore();
  const { loopService, engineState } = services;
  const materialService = services.getMaterialService();
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
    [isEngineReady]
  );

  // Aplicar material al portal cuando esté listo
  useEffect(() => {
    if (!isEngineReady || !portal || !materialService) {
      return;
    }

    const applyPortalMaterial = () => {
      try {
        // Verificar que el portal sea un Mesh
        if (!(portal instanceof THREE.Mesh)) {
          return;
        }

        // Aplicar el material del portal
        materialService.applyMaterialsToPortal(portal, portalUniforms);

        // Verificar que el material se aplicó correctamente
        const appliedMaterial = portal.material as THREE.ShaderMaterial;
        if (appliedMaterial && appliedMaterial.uniforms) {
          portalMaterialRef.current = appliedMaterial;
        }
      } catch (error) {
        console.error("Error aplicando material al portal:", error);
      }
    };

    // Aplicar material inmediatamente
    applyPortalMaterial();
  }, [portal, portalUniforms, materialService, isEngineReady]);

  // Animación del portal - solo si el material está listo
  useEffect(() => {
    if (!isEngineReady || !loopService || !portalMaterialRef.current) {
      return;
    }

    const animatePortal = (_: unknown, dt: number) => {
      if (portalMaterialRef.current?.uniforms?.uTime) {
        portalMaterialRef.current.uniforms.uTime.value += dt;
      }
    };

    loopService.subscribe(animatePortal);
    return () => loopService.unsubscribe(animatePortal);
  }, [loopService, isEngineReady, portalMaterialRef.current]);

  return <NodeScene />;
};
