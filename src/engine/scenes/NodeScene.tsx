import { useEffect, useState } from "react";
import { Node, useEngineCore } from "@engine/core";
import { useEngineState } from "../hooks";
import { NodeManager } from "../services/room/NodeManager";
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
    console.log("[NodeScene] useEffect ejecutándose, isEngineReady:", isEngineReady);
    if (isEngineReady) {
      const nodeManager = core.getService(NodeManager);
      console.log("[NodeScene] nodeManager obtenido:", !!nodeManager);
      const nodeCreated = nodeManager.createNode();
      console.log("[NodeScene] nodo creado:", !!nodeCreated);
      if (nodeCreated) {
        setNode(nodeCreated);
        console.log("[NodeScene] ✅ Nodo establecido en estado local");
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
