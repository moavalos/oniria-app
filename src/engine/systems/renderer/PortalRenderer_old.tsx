import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEngineCore } from "@/engine/Engine";
import { EngineState } from "@/engine/types";
import NodeScene from "@/engine/scenes/NodeScene";

interface PortalRendererProps {
  portal?: THREE.Object3D;
}

export const PortalRenderer = ({ portal }: PortalRendererProps) => {
  const core = useEngineCore();
  const { loopService, engineState } = core;
  const materialService = core.getMaterialService();
  const portalMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [materialReady, setMaterialReady] = useState(false);

  const isEngineReady = engineState === EngineState.READY;

  console.log("🚪 PortalRenderer - Render:", {
    hasPortal: !!portal,
    portalName: portal?.name,
    isEngineReady,
    materialReady,
    hasMaterialService: !!materialService,
    hasLoopService: !!loopService,
  });

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
    [] // ✅ Removido isEngineReady para evitar recreaciones
  );

  // Reset material state cuando cambien las condiciones
  useEffect(() => {
    setMaterialReady(false);
  }, [portal, isEngineReady]);

  // Aplicar material y configurar animación del portal
  useEffect(() => {
    console.log("🚪 PortalRenderer - Material & Animation effect triggered:", {
      isEngineReady,
      hasPortal: !!portal,
      hasMaterialService: !!materialService,
      hasLoopService: !!loopService,
      materialReady,
    });

    if (!isEngineReady || !portal || !materialService || !loopService) {
      console.log("🚪 PortalRenderer - Requirements not ready, skipping");
      return;
    }

    // ✅ Solo aplicar si no está ya aplicado
    if (materialReady) {
      console.log("🚪 PortalRenderer - Material already applied, skipping");
      return;
    }

    const applyMaterialAndSetupAnimation = () => {
      try {
        console.log("🚪 PortalRenderer - Applying material to portal");

        // ✅ Verificar referencias del portal
        console.log("🚪 PortalRenderer - Portal references:", {
          portalId: portal.id,
          portalUuid: portal.uuid,
          portalName: portal.name,
          portalType: portal.type,
          isPortalMesh: portal instanceof THREE.Mesh,
          currentMaterial: Array.isArray((portal as THREE.Mesh).material)
            ? "Array of materials"
            : ((portal as THREE.Mesh).material as THREE.Material)?.type,
          portalParent: portal.parent?.type,
          portalPosition: portal.position,
          portalInScene: !!portal.parent,
        });

        // Verificar que el portal sea un Mesh
        if (!(portal instanceof THREE.Mesh)) {
          console.warn(
            "🚪 PortalRenderer - Portal is not a Mesh:",
            portal?.type
          );
          return;
        }

        // ✅ Agregar un pequeño delay para asegurar que Three.js esté listo
        setTimeout(() => {
          console.log("🚪 PortalRenderer - Applying material after delay");

          // Aplicar el material del portal
          materialService.applyMaterialsToPortal(portal, portalUniforms);

          // ✅ Verificar que el material cambió
          console.log("🚪 PortalRenderer - After applying material:", {
            newMaterialType: Array.isArray((portal as THREE.Mesh).material)
              ? "Array of materials"
              : ((portal as THREE.Mesh).material as THREE.Material)?.type,
            hasUniforms:
              !!(portal as THREE.Mesh).material &&
              !Array.isArray((portal as THREE.Mesh).material) &&
              !!((portal as THREE.Mesh).material as THREE.ShaderMaterial)
                .uniforms,
            uniformsKeys:
              !!(portal as THREE.Mesh).material &&
              !Array.isArray((portal as THREE.Mesh).material) &&
              !!((portal as THREE.Mesh).material as THREE.ShaderMaterial)
                .uniforms
                ? Object.keys(
                    ((portal as THREE.Mesh).material as THREE.ShaderMaterial)
                      .uniforms
                  )
                : [],
          });

          // Verificar que el material se aplicó correctamente
          const appliedMaterial = portal.material as THREE.ShaderMaterial;
          if (appliedMaterial && appliedMaterial.uniforms) {
            portalMaterialRef.current = appliedMaterial;
            console.log(
              "🚪 PortalRenderer - Material ready, setting up animation"
            );

            // ✅ Configurar animación inmediatamente
            const animatePortal = (_: unknown, dt: number) => {
              if (portalMaterialRef.current?.uniforms?.uTime) {
                const oldTime = portalMaterialRef.current.uniforms.uTime.value;
                portalMaterialRef.current.uniforms.uTime.value += dt;

                // Log periódico para verificar que uTime está cambiando
                if (
                  Math.floor(oldTime) !==
                  Math.floor(portalMaterialRef.current.uniforms.uTime.value)
                ) {
                  console.log("🚪 PortalRenderer - uTime updated:", {
                    oldTime: oldTime.toFixed(2),
                    newTime:
                      portalMaterialRef.current.uniforms.uTime.value.toFixed(2),
                    delta: dt.toFixed(4),
                    materialType: portalMaterialRef.current.type,
                    hasFragmentShader:
                      !!portalMaterialRef.current.fragmentShader,
                    hasVertexShader: !!portalMaterialRef.current.vertexShader,
                  });
                }
              }
            };

            loopService.subscribe(animatePortal);
            setMaterialReady(true); // ✅ Marcar como listo al final

            // Store cleanup function globally so we can access it
            (globalThis as any).cleanupPortalAnimation = () => {
              console.log("🚪 PortalRenderer - Cleaning up animation");
              loopService.unsubscribe(animatePortal);
            };
          } else {
            console.warn(
              "🚪 PortalRenderer - Failed to apply material or no uniforms"
            );
          }
        }, 16); // Un frame de delay (~16ms)
      } catch (error) {
        console.error("Error aplicando material al portal:", error);
      }
    };

    // Aplicar material y configurar animación
    applyMaterialAndSetupAnimation();

    // Retornar cleanup function
    return () => {
      if ((globalThis as any).cleanupPortalAnimation) {
        (globalThis as any).cleanupPortalAnimation();
        (globalThis as any).cleanupPortalAnimation = null;
      }
    };
  }, [portal, portalUniforms, materialService, isEngineReady, loopService]); // ✅ No incluir materialReady

  return <NodeScene />;
};
