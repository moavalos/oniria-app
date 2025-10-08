import React, { useEffect, useState, useCallback, useRef } from "react";
import * as THREE from "three";
import { useThreeLoader } from "../hooks/useThreeLoader";
import { useProgress } from "../hooks/useProgress";
import { useEngineCore } from "../Engine";

export interface AssetManagerProps {
  /** Assets a cargar */
  assets: {
    url: string;
    type: "gltf" | "texture" | "ktx2" | "audio" | "binary";
  }[];

  /** Callback cuando los assets están organizados y listos para usar */
  onLoaded?: (organizedAssets: {
    scene?: THREE.Group;
    objectTexture?: THREE.Texture;
    environmentTexture?: THREE.Texture;
    [key: string]: any;
  }) => void;

  /** Callback de progreso de carga */
  onProgress?: (progress: number, items: any[]) => void;

  /** Callback de error */
  onError?: (error: string) => void;

  /** Callback cuando inicia la carga */
  onLoadStart?: () => void;

  /** Componente hijo que se renderiza cuando los assets están cargados */
  children?: React.ReactNode;

  /** Renderizado de fallback mientras carga */
  fallback?: React.ReactNode;
}
/**
 * AssetManager - Componente responsable únicamente de la carga de assets
 *
 * Separación clara de responsabilidades:
 * - Maneja la carga de assets usando useThreeLoader
 * - Proporciona callbacks para estados de carga
 * - Renderiza children solo cuando los assets están listos
 * - Los renderers pueden usarlo como wrapper sin preocuparse por la carga
 *
 * Ejemplo de uso:
 * ```tsx
 * <AssetManager
 *   assets={[
 *     { url: "/models/room.gltf", type: "gltf" },
 *     { url: "/textures/wall.ktx2", type: "ktx2" }
 *   ]}
 *   onLoaded={(organizedAssets) => {
 *     // organizedAssets.scene = extracted scene from GLTF
 *     // organizedAssets.objectTexture = texture for objects
 *     // organizedAssets.environmentTexture = texture for environment
 *     const { scene, objectTexture, environmentTexture } = organizedAssets;
 *   }}
 *   onProgress={(progress) => console.log(`${progress}%`)}
 * >
 *   <primitive object={scene} />
 * </AssetManager>
 * ```
 */
export default function AssetManager({
  assets,
  onLoaded,
  onProgress,
  onError,
  onLoadStart,
  children,
  fallback = null,
}: AssetManagerProps) {
  const { gl } = useEngineCore();
  const { loadAssets } = useThreeLoader(gl!);
  const { active: isLoading, progress, errors, items } = useProgress();

  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const loadingRef = useRef(false);

  // Callback de progreso
  useEffect(() => {
    if (onProgress && isLoading) {
      onProgress(progress, items);
    }
  }, [progress, items, isLoading, onProgress]);

  // Callback de error
  useEffect(() => {
    if (errors.length > 0 && onError) {
      onError(errors[0]); // Primer error
    }
  }, [errors, onError]);

  // Función para organizar assets cargados como lo hacía useLoader
  const organizeAssets = useCallback((rawAssets: { [key: string]: any }) => {
    const organized: {
      scene?: THREE.Group;
      objectTexture?: THREE.Texture;
      environmentTexture?: THREE.Texture;
      [key: string]: any;
    } = {};

    // Extraer scene del GLTF (useThreeLoader ya limpia los nombres)
    Object.entries(rawAssets).forEach(([name, asset]) => {
      if (asset && typeof asset === "object") {
        // Si es un GLTF, extraer la scene
        if (asset.scene && asset.scene instanceof THREE.Group) {
          organized.scene = asset.scene;
          organized[name] = asset; // También mantener el GLTF completo
        }
        // Si es una textura KTX2
        else if (asset instanceof THREE.Texture) {
          // Determinar si es object o environment basado en el nombre
          if (name.includes("object")) {
            organized.objectTexture = asset;
          } else if (name.includes("wall") || name.includes("environment")) {
            organized.environmentTexture = asset;
          }
          organized[name] = asset;
        }
        // Otros tipos de assets
        else {
          organized[name] = asset;
        }
      }
    });

    return organized;
  }, []);

  // Función para iniciar la carga
  const startLoading = useCallback(async () => {
    if (loadingRef.current || assets.length === 0) return;

    loadingRef.current = true;
    setAssetsLoaded(false);

    try {
      // Callback de inicio
      onLoadStart?.();

      // Cargar assets usando useThreeLoader (ya limpia nombres)
      const rawAssets = await loadAssets(assets);

      // Organizar assets como lo hacía useLoader
      const organizedAssets = organizeAssets(rawAssets);

      setAssetsLoaded(true);

      // Callback con assets organizados (similar a useLoader)
      onLoaded?.(organizedAssets);
    } catch (error) {
      console.error("❌ AssetManager: Error durante la carga:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      onError?.(errorMessage);
    } finally {
      loadingRef.current = false;
    }
  }, [assets, loadAssets, onLoaded, onLoadStart, onError, organizeAssets]);

  // Iniciar carga cuando cambian los assets
  useEffect(() => {
    startLoading();
  }, [startLoading]);

  // Reiniciar cuando cambian los assets
  useEffect(() => {
    loadingRef.current = false;
    setAssetsLoaded(false);
  }, [assets]);

  // Mostrar fallback mientras carga
  if (!assetsLoaded && fallback) {
    return <>{fallback}</>;
  }

  // No renderizar children hasta que los assets estén listos
  if (!assetsLoaded) {
    return null;
  }

  // Renderizar children cuando todo está listo
  return <>{children}</>;
}

/**
 * Hook helper para usar AssetManager con estado local
 */
export function useAssetManager() {
  const [assets, setAssets] = useState<{
    scene?: THREE.Group;
    objectTexture?: THREE.Texture;
    environmentTexture?: THREE.Texture;
    [key: string]: any;
  }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoaded = useCallback(
    (organizedAssets: {
      scene?: THREE.Group;
      objectTexture?: THREE.Texture;
      environmentTexture?: THREE.Texture;
      [key: string]: any;
    }) => {
      setAssets(organizedAssets);
      setIsLoaded(true);
      setError(null);
    },
    []
  );

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setIsLoaded(false);
  }, []);

  const reset = useCallback(() => {
    setAssets({});
    setIsLoaded(false);
    setError(null);
  }, []);

  return {
    assets,
    isLoaded,
    error,
    handleLoaded,
    handleError,
    reset,
  };
}
