import { useEffect, useState } from "react";
import { Mesh } from "three";
import { useEngineCore } from "@engine/core";
import { useEngineState } from "@engine/core/hooks";
import { NebulaManager } from "../services/managers/NebulaManager";

interface NebulaSceneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: { r: number; g: number; b: number } | string;
}

/**
 * Escena para renderizar el plano de fondo con shader de nebula.
 * Gestiona la renderización de un simple plano con shader procedural.
 */
export default function NebulaScene(props: NebulaSceneProps) {
  const { color, ...meshProps } = props;
  const [nebulaMesh, setNebulaMesh] = useState<Mesh | null>(null);

  const core = useEngineCore();
  const isEngineReady = useEngineState();

  useEffect(() => {
    if (isEngineReady) {
      const nebulaManager = core.getService(NebulaManager);

      // Validación adicional
      if (!nebulaManager) {
        console.error("[NebulaScene] NebulaManager no está disponible");
        return;
      }

      if (typeof nebulaManager.createNebula !== "function") {
        console.error(
          "[NebulaScene] createNebula no es una función",
          nebulaManager
        );
        return;
      }

      const mesh = nebulaManager.createNebula();
      if (mesh) {
        setNebulaMesh(mesh);
      }

      // Cleanup: destruir la nebula cuando NebulaScene se desmonta
      return () => {
        console.log("[NebulaScene] Cleaning up nebula");
        nebulaManager.destroyNebula();
        setNebulaMesh(null);
      };
    }
  }, [core, isEngineReady]);

  // Establecer color cuando cambie la prop o cuando la nebula esté lista
  useEffect(() => {
    if (isEngineReady && color) {
      const nebulaManager = core.getService(NebulaManager);
      if (nebulaManager) {
        nebulaManager.setNebulaColor(color);
      }
    }
  }, [core, isEngineReady, color]);

  return <>{nebulaMesh && <primitive {...meshProps} object={nebulaMesh} />}</>;
}
