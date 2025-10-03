import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useThreeLoader } from "../hooks";
import LoaderSystem from "../systems/LoaderSystem";

interface AssetLoaderProps {
  assets: {
    url: string;
    type: "gltf" | "texture" | "ktx2" | "audio" | "binary";
  }[];
  onAssetsLoaded?: (assets: { [key: string]: any }) => void;
  children?: React.ReactNode;
}

/**
 * Componente para cargar assets de Three.js con LoaderSystem propio
 *
 * Uso:
 * ```tsx
 * <AssetLoader
 *   assets={[
 *     { url: "/models/oniria.gltf", type: "gltf" },
 *     { url: "/skins/oniria_wall.ktx2", type: "ktx2" },
 *     { url: "/skins/oniria_object.ktx2", type: "ktx2" }
 *   ]}
 *   onAssetsLoaded={(assets) => {
 *     // assets.oniria = modelo GLTF
 *     // assets.oniria_wall = textura KTX2
 *     // assets.oniria_object = textura KTX2
 *   }}
 * >
 *   <YourScene />
 * </AssetLoader>
 * ```
 */
export default function AssetLoader({
  assets,
  onAssetsLoaded,
  children,
}: AssetLoaderProps) {
  const { gl } = useThree();
  const { loadAssets } = useThreeLoader(gl);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (assets.length === 0) {
      setAssetsLoaded(true);
      return;
    }

    const startLoading = async () => {
      try {
        console.log("🎯 AssetLoader: Iniciando carga de assets");
        const loadedAssets = await loadAssets(assets);

        console.log(
          "✅ AssetLoader: Assets cargados:",
          Object.keys(loadedAssets)
        );
        onAssetsLoaded?.(loadedAssets);
        setAssetsLoaded(true);
      } catch (err) {
        console.error("❌ AssetLoader: Error cargando assets:", err);
      }
    };

    startLoading();
  }, [assets, loadAssets, onAssetsLoaded]);

  return (
    <>
      <LoaderSystem
        onLoadStart={() => console.log("🚀 AssetLoader: Carga iniciada")}
        onLoadProgress={(p) => console.log(`📊 AssetLoader: ${Math.round(p)}%`)}
        onLoadComplete={() => console.log("✅ AssetLoader: Carga completada")}
        onLoadError={(err) => console.error("❌ AssetLoader: Error:", err)}
      />

      {assetsLoaded && children}
    </>
  );
}
