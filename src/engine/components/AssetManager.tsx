import React, { useEffect, useState, useCallback, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useThreeLoader } from "../hooks/useThreeLoader";
import { useProgress } from "../hooks/useProgress";

export interface AssetManagerProps {
  /** Assets a cargar */
  assets: {
    url: string;
    type: "gltf" | "texture" | "ktx2" | "audio" | "binary";
  }[];

  /** Callback cuando todos los assets están cargados */
  onLoaded?: (assets: { [key: string]: any }) => void;

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
 *   onLoaded={(assets) => {
 *     // assets.room = GLTF model
 *     // assets.wall = KTX2 texture
 *     setLoadedAssets(assets);
 *   }}
 *   onProgress={(progress) => console.log(`${progress}%`)}
 * >
 *   <primitive object={loadedRoom} />
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
  const { gl } = useThree();
  const { loadAssets } = useThreeLoader(gl);
  const { active: isLoading, progress, errors, items } = useProgress();

  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadedAssets, setLoadedAssets] = useState<{ [key: string]: any }>({});
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

  // Función para iniciar la carga
  const startLoading = useCallback(async () => {
    if (loadingRef.current || assets.length === 0) return;

    loadingRef.current = true;
    setAssetsLoaded(false);

    try {
      console.log(
        "🎯 AssetManager: Iniciando carga de",
        assets.length,
        "assets"
      );

      // Callback de inicio
      onLoadStart?.();

      // Cargar assets
      const loaded = await loadAssets(assets);

      console.log(
        "✅ AssetManager: Assets cargados exitosamente:",
        Object.keys(loaded)
      );

      // Preparar assets con nombres limpiados
      const cleanedAssets: { [key: string]: any } = {};
      Object.entries(loaded).forEach(([url, asset]) => {
        // Extraer nombre del archivo sin extensión
        const fileName = url.split("/").pop()?.split(".")[0] || url;
        cleanedAssets[fileName] = asset;
      });

      setLoadedAssets(cleanedAssets);
      setAssetsLoaded(true);

      // Callback de completado
      onLoaded?.(cleanedAssets);
    } catch (error) {
      console.error("❌ AssetManager: Error durante la carga:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      onError?.(errorMessage);
    } finally {
      loadingRef.current = false;
    }
  }, [assets, loadAssets, onLoaded, onLoadStart, onError]);

  // Iniciar carga cuando cambian los assets
  useEffect(() => {
    startLoading();
  }, [startLoading]);

  // Reiniciar cuando cambian los assets
  useEffect(() => {
    loadingRef.current = false;
    setAssetsLoaded(false);
    setLoadedAssets({});
  }, [assets]);

  // Log del estado actual
  console.log("🎯 AssetManager:", {
    isLoading,
    progress: Math.round(progress),
    assetsLoaded,
    loadedAssetKeys: Object.keys(loadedAssets),
    errors: errors.length,
  });

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
  const [assets, setAssets] = useState<{ [key: string]: any }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoaded = useCallback((loadedAssets: { [key: string]: any }) => {
    setAssets(loadedAssets);
    setIsLoaded(true);
    setError(null);
  }, []);

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
