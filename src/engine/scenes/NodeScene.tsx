import * as THREE from "three";
import { useRef, useEffect } from "react";

import { NodeRenderer } from "../systems/renderer/NodeRenderer";
import { useEngineCore } from "@engine/core";
import { useTransitions } from "../hooks";

interface NodeSceneProps {
  position?: [number, number, number];
}

/**
 * Escena para renderizar nodos 3D.
 * Gestiona la renderización de nodos especiales en la escena.
 */
export default function NodeScene({
  position = [-1.1, 2.85, -6.4],
}: NodeSceneProps) {
  const nodeRef = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const core = useEngineCore();
  const { viewNodes } = useTransitions();

  // Registrar el nodo cuando la referencia esté disponible
  useEffect(() => {
    if (nodeRef.current) {
      // Registrar el nodo con un ID por defecto o dinámico
      //despues lo vemos despues
      core.registerNode("default-node", nodeRef.current);
    }
  }, [core, nodeRef]);

  /**
   * useEffect separado para manejar el evento controlend
   * este effecto hace que luego de mover la camara y soltarla
   * la camara enfoque al nodo nuevamente
   */
  useEffect(() => {
    const cameraService = core.getCameraService();
    if (!cameraService) return;

    cameraService.addEventListener("controlend", viewNodes);

    return () => {
      cameraService.removeEventListener("controlend", viewNodes);
    };
  }, [core.getCameraService, viewNodes]);

  return (
    <>
      <NodeRenderer ref={nodeRef} position={position} />
    </>
  );
}
