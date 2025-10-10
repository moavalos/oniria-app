import * as THREE from "three";
import { NodeRenderer } from "../systems/renderer/NodeRenderer";
import { useRef, useEffect } from "react";
import { useEngineCore } from "../Engine";

export default function NodeScene() {
  const nodeRef = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const core = useEngineCore();

  // Registrar el nodo cuando la referencia esté disponible
  useEffect(() => {
    if (nodeRef.current) {
      // Registrar el nodo con un ID por defecto o dinámico
      //despues lo vemos despues

      core.registerNode("default-node", nodeRef.current);
    }
  }, [core, nodeRef]);

  return (
    <>
      <NodeRenderer ref={nodeRef} />
    </>
  );
}
