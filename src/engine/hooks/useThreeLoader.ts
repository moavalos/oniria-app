import { useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useLoaderActions } from "./useProgress";

export interface LoadingItem {
    url: string;
    type: 'gltf' | 'texture' | 'ktx2' | 'audio' | 'binary';
    loaded: boolean;
    progress: number;
    error?: string;
}

export interface UseLoaderResult {
    loadAssets: (urls: { url: string; type: LoadingItem['type'] }[]) => Promise<{ [key: string]: any }>;
    resetLoader: () => void;
}

export function useThreeLoader(renderer?: THREE.WebGLRenderer): UseLoaderResult {
    const {
        startLoading,
        finishLoading,
        setItems,
        updateItem,
        addError,
        resetLoading
    } = useLoaderActions();


    const loadersRef = useRef<{
        gltf: GLTFLoader;
        texture: THREE.TextureLoader;
        ktx2: KTX2Loader;
        audio: THREE.AudioLoader;
        file: THREE.FileLoader;
    } | null>(null);

    // Verificar archivos del transcoder
    const checkTranscoderFiles = useCallback(async () => {
        const files = ['./basis/basis_transcoder.js', './basis/basis_transcoder.wasm'];
        for (const file of files) {
            try {
                const response = await fetch(file, { method: 'HEAD' });
                if (!response.ok) {
                    console.warn(`Archivo del transcoder no encontrado: ${file}`);
                    return false;
                }
            } catch (err) {
                console.warn(`Error verificando archivo del transcoder ${file}:`, err);
                return false;
            }
        }
        console.log("Archivos del transcoder KTX2 verificados");
        return true;
    }, []);


    // Inicializar loaders
    const initLoaders = useCallback(() => {
        if (loadersRef.current) return loadersRef.current;

        const manager = new THREE.LoadingManager();

        const gltfLoader = new GLTFLoader(manager);
        const textureLoader = new THREE.TextureLoader(manager);
        const ktx2Loader = new KTX2Loader(manager);
        const audioLoader = new THREE.AudioLoader(manager);
        const fileLoader = new THREE.FileLoader(manager);

        //Configurar DRACO para GLTF
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./draco/');
        gltfLoader.setDRACOLoader(dracoLoader);

        // Configurar KTX2 - CRÍTICO: debe estar configurado antes de usar
        ktx2Loader.setTranscoderPath('./basis/');

        // Verificar archivos del transcoder en desarrollo
        if (process.env.NODE_ENV === 'development') {
            checkTranscoderFiles().catch(err =>
                console.warn("Verificación de archivos del transcoder falló:", err)
            );
        }

        // Detectar soporte solo si hay renderer
        if (renderer) {
            console.log("Configurando KTX2Loader con renderer:", {
                renderer: renderer.constructor.name,
                capabilities: renderer.capabilities?.getMaxAnisotropy?.() || 'N/A'
            });

            try {
                ktx2Loader.detectSupport(renderer);
                console.log("KTX2Loader.detectSupport() ejecutado exitosamente");
            } catch (err) {
                console.error("Error en KTX2Loader.detectSupport():", err);
            }
        } else {
            console.warn("KTX2Loader: No renderer disponible, algunas texturas KTX2 pueden fallar");
        }

        loadersRef.current = {
            gltf: gltfLoader,
            texture: textureLoader,
            ktx2: ktx2Loader,
            audio: audioLoader,
            file: fileLoader
        };

        console.log("Loaders inicializados:", {
            hasRenderer: !!renderer,
            ktx2Configured: !!renderer
        });

        return loadersRef.current;
    }, [renderer, checkTranscoderFiles]); const resetLoader = useCallback(() => {
        resetLoading();
    }, [resetLoading]);

  const loadAssets = useCallback(async (urls: { url: string; type: LoadingItem['type'] }[]): Promise<{ [key: string]: any }> => {
    if (urls.length === 0) {
      return {};
    }

    try {
      startLoading();
      
      // Initialize items in store
      const initialItems: LoadingItem[] = urls.map(({ url, type }) => ({
        url,
        type,
        loaded: false,
        progress: 0
      }));
      
      setItems(initialItems);
      
      const loaders = initLoaders();
      const results: { [key: string]: any } = {};
      
      // Track global progress
      const assetProgressTracker = new Map<number, { loaded: number; total: number }>();
      
      // Function to calculate and update global progress
      const updateGlobalProgress = () => {
        let totalLoaded = 0;
        let totalSize = 0;
        
        assetProgressTracker.forEach(({ loaded, total }) => {
          totalLoaded += loaded;
          totalSize += total;
        });
        
        const globalProgress = totalSize > 0 ? (totalLoaded / totalSize) * 100 : 0;
        
        // Update store with global progress
        console.log(`📊 Progreso global: ${Math.round(globalProgress)}% (${totalLoaded}/${totalSize} bytes)`);
      };

      const loadPromises = urls.map(async ({ url, type }, index) => {
        try {
          let loader: any;

          switch (type) {
            case 'gltf':
              loader = loaders.gltf;
              break;
            case 'texture':
              loader = loaders.texture;
              break;
            case 'ktx2':
              loader = loaders.ktx2;
              // Validación crítica para KTX2
              if (!renderer) {
                throw new Error("KTX2Loader requiere un renderer.");
              }

              // Verificar que el KTX2Loader esté correctamente configurado
              if (loader.transcoderBinary === undefined) {
                console.warn("KTX2Loader: Transcoder binary no detectado, reintentando detectSupport");
                try {
                  loader.detectSupport(renderer);
                } catch (detectErr) {
                  console.error("Error reintentando detectSupport:", detectErr);
                }
              }

              console.log("Usando KTX2Loader para:", url, {
                hasTranscoder: !!loader._transcoderBinary,
                transcoderPath: loader._transcoderPath
              });
              break;
            case 'audio':
              loader = loaders.audio;
              break;
            case 'binary':
              loader = loaders.file;
              break;
            default:
              throw new Error(`Tipo de asset no soportado: ${type}`);
          }

          // Cargar con progreso global
          const result = await new Promise((resolve, reject) => {
            loader.load(
              url,
              // onLoad
              (data: any) => {
                console.log(`✅ Asset cargado: ${url}`);
                
                // Mark this asset as loaded (100% of its size)
                const currentProgress = assetProgressTracker.get(index);
                if (currentProgress) {
                  assetProgressTracker.set(index, {
                    loaded: currentProgress.total,
                    total: currentProgress.total
                  });
                }
                
                // Update item as loaded
                updateItem(index, { loaded: true, progress: 100 });
                updateGlobalProgress();

                resolve(data);
              },
              // onProgress
              (progressEvent: ProgressEvent) => {
                if (progressEvent.lengthComputable) {
                  // Update global progress tracker
                  assetProgressTracker.set(index, {
                    loaded: progressEvent.loaded,
                    total: progressEvent.total
                  });
                  
                  updateGlobalProgress();
                } else {
                  // If not computable, assume some progress
                  console.log(`📊 Progreso no computable para ${url}`);
                }
              },
              // onError
              (err: any) => {
                console.error(`❌ Error cargando ${url}:`, err);

                // Update item with error
                updateItem(index, { error: err.message || 'Error desconocido' });
                addError(err.message || 'Error desconocido');

                reject(err);
              }
            );
          });

          const fileName = url.split('/').pop()?.split('.')[0] || url;
          results[fileName] = result;

          return result;
        } catch (error) {
          const errorMessage = `Error setting up loader for ${url}: ${error}`;
          console.error(`❌ ${errorMessage}`, error);
          updateItem(index, { error: errorMessage });
          addError(errorMessage);
          throw error;
        }
      });

      await Promise.all(loadPromises);
      
      console.log('✅ All assets loaded successfully:', results);
      finishLoading();
      
      return results;
    } catch (error) {
      const errorMessage = `Asset loading failed: ${error}`;
      console.error(`❌ ${errorMessage}`, error);
      addError(errorMessage);
      finishLoading();
      throw error;
    }
  }, [startLoading, finishLoading, setItems, updateItem, addError, initLoaders]);

  return {
    loadAssets,
    resetLoader,
  };
}