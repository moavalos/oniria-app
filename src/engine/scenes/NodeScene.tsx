import * as THREE from "three";
import { NodeRenderer } from "../systems/renderer/NodeRenderer";
import { useRef, useEffect } from "react";
import { useEngineCore } from "../Engine";

export default function NodeScene() {
  const nodeRef = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const services = useEngineCore();

  // Registrar el nodo cuando la referencia esté disponible
  useEffect(() => {
    if (nodeRef.current) {
      // Registrar el nodo con un ID por defecto o dinámico
      services.registerNode("default-node", nodeRef.current);
    }
  }, [services, nodeRef.current]);

  return (
    <>
      <NodeRenderer ref={nodeRef} />
    </>
  );
}
