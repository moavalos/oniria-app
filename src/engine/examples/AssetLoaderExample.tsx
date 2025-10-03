import { useState } from "react";
import { Engine } from "@engine/Engine";
import AssetLoader from "@engine/components/AssetLoader";
import { DebugSystem } from "@engine/systems";

/**
 * Ejemplo de uso directo del AssetLoader
 *
 * Este ejemplo muestra cómo usar AssetLoader de forma independiente
 * para cargar assets y luego hacer algo con ellos.
 */
export default function AssetLoaderExample() {
  const [loadedAssets, setLoadedAssets] = useState<{ [key: string]: any }>({});
  const [showScene, setShowScene] = useState(false);

  const assets = [
    { url: "/models/oniria.gltf", type: "gltf" as const },
    { url: "/skins/oniria_wall.ktx2", type: "ktx2" as const },
    { url: "/skins/oniria_object.ktx2", type: "ktx2" as const },
  ];

  const handleAssetsLoaded = (assets: { [key: string]: any }) => {
    console.log("🎯 Assets cargados en el componente:", Object.keys(assets));
    setLoadedAssets(assets);
    setShowScene(true);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Engine.Canvas engineSettings={{ backgroundColor: "#1a1a1a" }}>
        <Engine.Core>
          <AssetLoader assets={assets} onAssetsLoaded={handleAssetsLoaded}>
            {/* Luces básicas */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Mostrar escena solo cuando los assets estén cargados */}
            {showScene && loadedAssets.oniria ? (
              <primitive object={loadedAssets.oniria.scene} />
            ) : (
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
              </mesh>
            )}

            {/* Debug controls */}
            <DebugSystem />
          </AssetLoader>
        </Engine.Core>
      </Engine.Canvas>

      {/* UI opcional para mostrar estado */}
      {showScene && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "monospace",
          }}
        >
          Assets cargados: {Object.keys(loadedAssets).join(", ")}
        </div>
      )}
    </div>
  );
}

/**
 * Diferencias entre AssetLoader y RoomRendererTest:
 *
 * AssetLoader:
 * - Más simple y directo
 * - Tú manejas qué hacer con los assets cargados
 * - Ideal para casos específicos
 *
 * RoomRendererTest:
 * - Más completo y automatizado
 * - Maneja la lógica completa de room rendering
 * - Ideal para reemplazar RoomRenderer original
 */
