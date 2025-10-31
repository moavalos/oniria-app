import { useEffect, useState } from "react";
import { Node, useEngineCore } from "@engine/core";
import { useEngineState } from "@engine/core/hooks";
import { NodeManager } from "../services/managers/NodeManager";
import { Float } from "@react-three/drei";

interface NodeSceneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

/**
 * Escena para renderizar nodos 3D.
 * Gestiona la renderización de nodos especiales en la escena.
 */
export default function NodeScene(props: NodeSceneProps) {
  const [node, setNode] = useState<Node | null>(null);

  const core = useEngineCore();
  const isEngineReady = useEngineState();

  useEffect(() => {
    if (isEngineReady) {
      const nodeManager = core.getService(NodeManager);
      const nodeCreated = nodeManager.createNode();
      if (nodeCreated) {
        setNode(nodeCreated);
      }

      // Cleanup: destruir el nodo cuando NodeScene se desmonta
      return () => {
        console.log("[NodeScene] Cleaning up node");
        nodeManager.destroyNode();
        setNode(null);
      };
    }
  }, [core, isEngineReady]);

  return (
    <>
      {node && (
        <Float
          speed={7}
          floatingRange={[-0.05, 0]}
          rotationIntensity={0.01}
          floatIntensity={0.6}
        >
          <primitive {...props} object={node.getGroup()!} />
        </Float>
      )}
    </>
  );
}
